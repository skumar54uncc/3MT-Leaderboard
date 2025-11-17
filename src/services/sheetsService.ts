import type { SheetRow, Finalist, JudgeScore } from '../types';

// Google Sheets configuration
const SPREADSHEET_ID = '1U-HaOFUK5DSgbknHRM_CiDcH30qWHCSLF9fWsJ015d0';
// Fetch columns B, C, D, H, I, J (Round, Judge, Student, Research, Presentation, Total)
// Note: We need to fetch B:J to get all columns, then map indices correctly
const RANGE = 'Finalists Score!B2:J100'; // Adjust range as needed
const JUDGES_COUNT = 7;
const MAX_SCORE_PER_JUDGE = 14;

// For client-side usage, we'll use a proxy approach
// In production, you should use a backend API endpoint
export class SheetsService {
  private apiKey: string | null = null;
  private refreshInterval: number = 8000; // 8 seconds

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  /**
   * Fetch data from Google Sheets using public API or service account
   * For public sheets, we can use the public API
   * For private sheets, use a backend proxy (see backend-proxy-example.js)
   * 
   * To use backend proxy, replace this method to call your backend endpoint:
   * const response = await fetch('http://your-backend/api/sheets/scores');
   */
  async fetchSheetData(): Promise<{ rows: SheetRow[]; isMockData: boolean }> {
    try {
      // Check if API key is set
      if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
        console.warn('⚠️ Google Sheets API key not set. Using mock data.');
        console.warn('   Set VITE_GOOGLE_SHEETS_API_KEY in your .env file');
        return { rows: this.getMockData(), isMockData: true };
      }

      // Option 1: Public sheet access (if sheet is published)
      // Option 2: Use backend proxy for production (recommended)
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${this.apiKey}`;
      
      console.log('📊 Fetching data from Google Sheets...', { url: url.replace(this.apiKey, '***') });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Google Sheets API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`Failed to fetch sheet data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Received data from Google Sheets:', {
        rowCount: data.values?.length || 0,
        range: data.range
      });

      const rows: SheetRow[] = [];

      if (data.values && Array.isArray(data.values)) {
        // Process rows (starting from row 2, which is index 0 in the response)
        // Column mapping: B=0, C=1, D=2, E=3, F=4, G=5, H=6, I=7, J=8
        for (let i = 0; i < data.values.length; i++) {
          const row = data.values[i];
          if (row && row.length >= 3) {
            // Ensure we have at least Round, Judge, and Student
            // H (Research) is at index 6, I (Presentation) at 7, J (Total) at 8
            rows.push({
              round: row[0] || '',           // Column B
              judgeName: row[1] || '',        // Column C
              studentName: row[2] || '',      // Column D
              researchScore: row[6] || '',   // Column H
              presentationScore: row[7] || '', // Column I
              totalScore: row[8] || '',      // Column J
            });
          }
        }
        console.log(`📝 Processed ${rows.length} rows from sheet`);
      } else {
        console.warn('⚠️ No data.values found in response. Sheet might be empty or range is incorrect.');
      }

      return { rows, isMockData: false };
    } catch (error) {
      console.error('❌ Error fetching sheet data:', error);
      console.error('   Falling back to mock data for development');
      // Return mock data for development
      return { rows: this.getMockData(), isMockData: true };
    }
  }

  /**
   * Process raw sheet data into finalist scores
   * Always shows all finalists found in the sheet, even if they don't have scores yet
   * Only processes scores where column J (totalScore) has a value
   */
  processScores(rows: SheetRow[]): Finalist[] {
    const finalistMap = new Map<string, JudgeScore[]>();
    const allStudentNames = new Set<string>();

    console.log(`🔄 Processing ${rows.length} rows...`);

    // First pass: collect all unique student names from the sheet
    rows.forEach(row => {
      if (row.studentName && row.studentName.trim()) {
        allStudentNames.add(row.studentName.trim());
      }
    });

    // Second pass: process scores (only rows where column J is filled)
    rows.forEach(row => {
      if (!row.studentName || !row.judgeName) {
        // Skip rows without required data
        return;
      }

      // Only process rows where column J (totalScore) is filled
      const totalScoreStr = row.totalScore?.trim() || '';
      if (totalScoreStr === '' || isNaN(parseFloat(totalScoreStr))) {
        // Skip rows where column J is empty
        return;
      }

      const researchScore = parseFloat(row.researchScore) || 0;
      const presentationScore = parseFloat(row.presentationScore) || 0;
      const totalScore = parseFloat(row.totalScore) || (researchScore + presentationScore);

      // Enforce 14-point cap per judge
      const cappedTotal = Math.min(totalScore, MAX_SCORE_PER_JUDGE);

      if (!finalistMap.has(row.studentName)) {
        finalistMap.set(row.studentName, []);
      }

      finalistMap.get(row.studentName)!.push({
        judgeName: row.judgeName,
        researchScore,
        presentationScore,
        totalScore: cappedTotal,
      });
    });

    console.log(`👥 Found ${allStudentNames.size} unique finalists (${finalistMap.size} with scores)`);

    // Create finalist objects for ALL students found in the sheet
    // This ensures all 11 finalists are always shown, even if they don't have scores yet
    const finalists: Finalist[] = Array.from(allStudentNames).map((name) => {
      const scores = finalistMap.get(name) || []; // Get scores if they exist, otherwise empty array
      const totalScore = scores.reduce((sum, score) => sum + score.totalScore, 0);
      
      return {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        totalScore: Math.round(totalScore * 100) / 100, // Round to 2 decimals
        rank: 0, // Will be set after sorting
        previousRank: 0,
        scores,
      };
    });

    // Sort by total score (descending) and assign ranks
    // Finalists with 0 scores will be at the bottom
    finalists.sort((a, b) => {
      // If scores are equal, maintain alphabetical order for consistency
      if (b.totalScore === a.totalScore) {
        return a.name.localeCompare(b.name);
      }
      return b.totalScore - a.totalScore;
    });
    finalists.forEach((finalist, index) => {
      finalist.rank = index + 1;
    });

    return finalists;
  }

  /**
   * Check if all judges have completed scoring by checking if column J (Total Score) is filled
   * Returns completion status and count of rows with scores
   * Expected: 11 finalists × 7 judges = 77 rows total
   */
  checkCompletion(rows: SheetRow[]): { isComplete: boolean; judgesCompleted: number; totalExpected: number } {
    if (rows.length === 0) {
      return { isComplete: false, judgesCompleted: 0, totalExpected: 0 };
    }
    
    // Count rows where column J (totalScore) is filled (not empty)
    const rowsWithScores = rows.filter(row => {
      const totalScore = row.totalScore?.trim() || '';
      // Check if totalScore is a valid number (not empty, not just whitespace)
      return totalScore !== '' && !isNaN(parseFloat(totalScore));
    });
    
    const rowsCompleted = rowsWithScores.length;
    // Expected: 11 finalists × 7 judges = 77 rows
    const totalExpected = 11 * JUDGES_COUNT; // 77 rows
    const isComplete = rowsCompleted >= totalExpected;
    
    // Calculate how many judges have completed (approximate based on filled rows)
    // This is approximate: rowsCompleted / 11 finalists = judges completed
    const judgesCompleted = Math.floor(rowsCompleted / 11);
    
    console.log(`📊 Completion check: ${rowsCompleted}/${totalExpected} rows filled, ${judgesCompleted} judges completed`);
    
    return { isComplete, judgesCompleted: Math.min(judgesCompleted, JUDGES_COUNT), totalExpected };
  }

  /**
   * Mock data for development/testing
   */
  private getMockData(): SheetRow[] {
    const judges = [
      'Matteo Di Michele',
      'Scott McFarlane',
      'Shane Taylor',
      'Elma Lloyd',
      'Kirsten C. Rodgers',
      'Davina Demelenne',
      'Claudio Ferri'
    ];

    const students = [
      'Sadia Siraz',
      'Caroline West',
      'Kayla Lenz',
      'Rishi Misra',
      'Sarah Tabassum',
      'Hal West-Page',
      'Naz Fathma Tumpa',
      'MacGrgeor VanBeurden',
      'Kenneth Fields',
      'Amira Khalile',
      'Emily Citrano'
    ];

    const mockRows: SheetRow[] = [];
    
    judges.forEach(judge => {
      students.forEach(student => {
        const researchScore = Math.floor(Math.random() * 8); // 0-7
        const presentationScore = Math.floor(Math.random() * 8); // 0-7
        const total = Math.min(researchScore + presentationScore, 14);

        mockRows.push({
          round: 'Final',
          judgeName: judge,
          studentName: student,
          researchScore: researchScore.toString(),
          presentationScore: presentationScore.toString(),
          totalScore: total.toString(),
        });
      });
    });

    return mockRows;
  }

  getRefreshInterval(): number {
    return this.refreshInterval;
  }
}

