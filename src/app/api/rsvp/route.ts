import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const values = [[
      new Date().toISOString(),
      data.nombre,
      data.email,
      data.telefono,
      data.asistencia,
      data.acompanantes,
      data.alergias,
      data.transporte ? 'Sí' : 'No',
      data.alojamiento ? 'Sí' : 'No',
      data.comentarios
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:J',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al enviar datos' }, { status: 500 });
  }
}