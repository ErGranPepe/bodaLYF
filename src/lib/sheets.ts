import { google } from 'googleapis';

export interface RSVPData {
  timestamp: string;
  nombre: string;
  email: string;
  telefono: string;
  asistira: string;
  n_acompanantes: number;
  nombres_acompanantes: string;
  alergias: string;
  necesita_alojamiento: string;
  observaciones: string;
  ip_origen: string;
  user_agent: string;
}

export async function saveToGoogleSheets(data: RSVPData): Promise<boolean> {
  try {
    const sheetsId = process.env.GOOGLE_SHEETS_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!sheetsId || !serviceAccountEmail || !serviceAccountKey) {
      console.log('Google Sheets credentials not configured, skipping...');
      return false;
    }

    // Parse the service account key
    let privateKey: string;
    try {
      const keyData = JSON.parse(serviceAccountKey);
      privateKey = keyData.private_key;
    } catch {
      // If it's not JSON, assume it's the raw private key
      privateKey = serviceAccountKey;
    }

    // Create JWT client
    const jwtClient = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Authorize the client
    await jwtClient.authorize();

    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Prepare the row data
    const values = [[
      data.timestamp,
      data.nombre,
      data.email,
      data.telefono,
      data.asistira,
      data.n_acompanantes,
      data.nombres_acompanantes,
      data.alergias,
      data.necesita_alojamiento,
      data.observaciones,
      data.ip_origen,
      data.user_agent
    ]];

    // Append the data
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetsId,
      range: 'A:L', // Columns A through L
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
}

export async function readFromGoogleSheets(): Promise<RSVPData[]> {
  try {
    const sheetsId = process.env.GOOGLE_SHEETS_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!sheetsId || !serviceAccountEmail || !serviceAccountKey) {
      return [];
    }

    // Parse the service account key
    let privateKey: string;
    try {
      const keyData = JSON.parse(serviceAccountKey);
      privateKey = keyData.private_key;
    } catch {
      privateKey = serviceAccountKey;
    }

    // Create JWT client
    const jwtClient = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Authorize the client
    await jwtClient.authorize();

    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Read the data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetsId,
      range: 'A:L',
    });

    const rows = response.data.values || [];
    
    // Skip header row if it exists
    const dataRows = rows.slice(1);
    
    return dataRows.map((row): RSVPData => ({
      timestamp: row[0] || '',
      nombre: row[1] || '',
      email: row[2] || '',
      telefono: row[3] || '',
      asistira: row[4] || '',
      n_acompanantes: parseInt(row[5]) || 0,
      nombres_acompanantes: row[6] || '',
      alergias: row[7] || '',
      necesita_alojamiento: row[8] || '',
      observaciones: row[9] || '',
      ip_origen: row[10] || '',
      user_agent: row[11] || ''
    }));
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    return [];
  }
}