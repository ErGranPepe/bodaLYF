import { z } from 'zod';

export const rsvpSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  asistira: z.enum(['Sí', 'No'], {
    required_error: 'Debes indicar si asistirás'
  }),
  n_acompanantes: z.number().min(0).max(6),
  nombres_acompanantes: z.string().optional(),
  alergias: z.string().optional(),
  necesita_alojamiento: z.enum(['Sí', 'No'], {
    required_error: 'Debes indicar si necesitas alojamiento'
  }),
  observaciones: z.string().optional(),
  consentimiento: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar el tratamiento de datos personales'
  }),
  // Honeypot field for spam protection
  website: z.string().optional()
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;