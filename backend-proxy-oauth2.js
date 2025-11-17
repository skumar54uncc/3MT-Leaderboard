/**
 * Backend Proxy for Google Sheets API using OAuth2 Credentials
 * 
 * This version uses OAuth2 client credentials (client_secret_*.json file)
 * 
 * Setup:
 * 1. npm install express googleapis dotenv
 * 2. Place your client_secret_*.json file in the root directory
 * 3. Update CREDENTIALS_FILE_PATH below to match your file name
 * 4. Share your Google Sheet with the OAuth2 client email (if needed)
 * 5. Run: node backend-proxy-oauth2.js
 * 
 * Note: OAuth2 requires initial user authorization. For automated access,
 * consider using a Service Account instead (see backend-proxy-example.js)
 */

const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

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

// Path to your OAuth2 credentials file
// Update this to match your actual file name
const CREDENTIALS_FILE_PATH = path.join(__dirname, 'client_secret_33518383387-t1shjctphnt5kl3lsgoqnfhnl36rvv22.apps.googleusercontent.com.json');

// OAuth2 client (for user authorization flow)
let oauth2Client = null;
let sheetsClient = null;

// Initialize OAuth2 client
function initializeOAuth2() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_FILE_PATH, 'utf8'));
    const { client_secret, client_id, redirect_uris } = credentials.web;
    
    oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0] || 'http://localhost:3001/oauth2callback'
    );

    // For automated access, you'll need to:
    // 1. Get an access token (requires user authorization first time)
    // 2. Store the refresh token
    // 3. Use refresh token for subsequent requests
    
    console.log('OAuth2 client initialized');
    console.log('⚠️  Note: OAuth2 requires user authorization. For automated leaderboard,');
    console.log('   consider using a Service Account instead.');
    
    return oauth2Client;
  } catch (error) {
    console.error('Error loading OAuth2 credentials:', error);
    throw error;
  }
}

// OAuth2 authorization URL endpoint (for initial setup)
app.get('/auth', (req, res) => {
  if (!oauth2Client) {
    initializeOAuth2();
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  res.redirect(authUrl);
});

// OAuth2 callback endpoint
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Store tokens (in production, use a database)
    console.log('Tokens received. Save these for future use:');
    console.log(JSON.stringify(tokens, null, 2));
    
    res.send('Authorization successful! You can now use the API.');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Error during authorization');
  }
});

// Endpoint to fetch scores
app.get('/api/sheets/scores', async (req, res) => {
  try {
    // Check if we have access token
    if (!oauth2Client) {
      initializeOAuth2();
    }

    // If no access token, redirect to auth
    if (!oauth2Client.credentials.access_token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized. Visit /auth to authorize',
        authUrl: `http://localhost:${PORT}/auth`
      });
    }

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
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
    
    // If token expired, redirect to re-auth
    if (error.code === 401) {
      return res.status(401).json({
        success: false,
        error: 'Token expired. Visit /auth to re-authorize',
        authUrl: `http://localhost:${PORT}/auth`
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sheet data',
      details: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend proxy running on http://localhost:${PORT}`);
  console.log(`📊 Access scores at: http://localhost:${PORT}/api/sheets/scores`);
  console.log(`🔐 Authorize at: http://localhost:${PORT}/auth`);
  console.log(`\n⚠️  IMPORTANT: OAuth2 requires user authorization.`);
  console.log(`   For automated leaderboard access, use a Service Account instead.\n`);
});

