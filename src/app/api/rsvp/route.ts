import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Cargar el JSON del service account
    const keyPath = path.join(process.cwd(), "service-account.json");

    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // EL ID DE TU EXCEL REAL (el que ya tienes con invitados)
    const spreadsheetId = "1PDbMbCkRjJ62fcolm42SHoQh_xbv_nOUN-81kb1js7c";

    const values = [[
      new Date().toISOString(),
      body.name || "",
      body.email || "",
      body.phone || "",
      body.attending || "",
      body.guests || "",
      body.allergies || "",
      body.transport || "",
      body.accommodation || "",
      body.comments || "",
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Hoja 1!A1",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ ok: true, message: "Enviado correctamente" });

  } catch (error) {
    console.error("ERROR Google Sheets:", error);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}