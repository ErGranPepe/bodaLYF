import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Received RSVP data:', data);

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error('Missing Google Sheets API environment variables');
      return NextResponse.json({ error: 'Configuración del servidor incompleta' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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

    console.log('Appending values to Google Sheet:', values);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:J',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log('Google Sheets append response:', response.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar datos a Google Sheets:', error);
    return NextResponse.json({ error: 'Error al enviar datos' }, { status: 500 });
  }
}
