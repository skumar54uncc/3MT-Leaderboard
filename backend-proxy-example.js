/**
 * Example Backend Proxy for Google Sheets API
 * 
 * This is a Node.js/Express example for securely accessing Google Sheets
 * in production. Run this as a separate service and update the frontend
 * to call this endpoint instead of directly accessing Google Sheets API.
 * 
 * Setup:
 * 1. npm install express googleapis dotenv
 * 2. Create service account in Google Cloud Console
 * 3. Download service account JSON key
 * 4. Share your Google Sheet with the service account email
 * 5. Set GOOGLE_SERVICE_ACCOUNT_KEY environment variable
 */

const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Google Sheets configuration
const SPREADSHEET_ID = '1U-HaOFUK5DSgbknHRM_CiDcH30qWHCSLF9fWsJ015d0';
const RANGE = 'Finalists Score!B2:J100';

// Initialize Google Sheets API with service account
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY, // Path to service account JSON
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();
  return google.sheets({ version: 'v4', auth: authClient });
}

// Endpoint to fetch scores
app.get('/api/sheets/scores', async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    res.json({
      success: true,
      data: response.data.values || [],
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sheet data',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
  console.log(`Access scores at: http://localhost:${PORT}/api/sheets/scores`);
});

