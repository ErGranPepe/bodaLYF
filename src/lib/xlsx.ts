import * as XLSX from 'xlsx';
import { RSVPData } from './sheets';

export function exportToXLSX(data: RSVPData[]): Buffer {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert data to worksheet format
  const wsData = [
    // Header row
    [
      'Fecha/Hora',
      'Nombre',
      'Email',
      'Teléfono',
      'Asistirá',
      'Nº Acompañantes',
      'Nombres Acompañantes',
      'Alergias',
      'Necesita Alojamiento',
      'Observaciones',
      'IP',
      'User Agent'
    ],
    // Data rows
    ...data.map(row => [
      row.timestamp,
      row.nombre,
      row.email,
      row.telefono,
      row.asistira,
      row.n_acompanantes,
      row.nombres_acompanantes,
      row.alergias,
      row.necesita_alojamiento,
      row.observaciones,
      row.ip_origen,
      row.user_agent
    ])
  ];
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Confirmaciones');
  
  // Generate buffer
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

export function importFromXLSX(buffer: Buffer): RSVPData[] {
  try {
    // Read the workbook
    const wb = XLSX.read(buffer, { type: 'buffer' });
    
    // Get the first worksheet
    const wsName = wb.SheetNames[0];
    const ws = wb.Sheets[wsName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as (string | number)[][];
    
    // Skip header row and convert to RSVPData format
    const dataRows = jsonData.slice(1);
    
    return dataRows.map((row): RSVPData => ({
      timestamp: String(row[0] || ''),
      nombre: String(row[1] || ''),
      email: String(row[2] || ''),
      telefono: String(row[3] || ''),
      asistira: String(row[4] || ''),
      n_acompanantes: parseInt(String(row[5])) || 0,
      nombres_acompanantes: String(row[6] || ''),
      alergias: String(row[7] || ''),
      necesita_alojamiento: String(row[8] || ''),
      observaciones: String(row[9] || ''),
      ip_origen: String(row[10] || ''),
      user_agent: String(row[11] || '')
    }));
  } catch (error) {
    console.error('Error importing from XLSX:', error);
    return [];
  }
}