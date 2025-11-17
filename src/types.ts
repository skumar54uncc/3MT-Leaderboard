export interface Finalist {
  id: string;
  name: string;
  totalScore: number;
  rank: number;
  previousRank: number;
  scores: JudgeScore[];
}

export interface JudgeScore {
  judgeName: string;
  researchScore: number;
  presentationScore: number;
  totalScore: number;
}

export interface SheetRow {
  round: string;
  judgeName: string;
  studentName: string;
  researchScore: string;
  presentationScore: string;
  totalScore: string;
}

export interface LeaderboardState {
  finalists: Finalist[];
  isComplete: boolean;
  lastUpdate: Date | null;
  isUsingMockData?: boolean;
  judgesCompleted?: number;
  totalJudges?: number;
}

