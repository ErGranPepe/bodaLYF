import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Leire & Fran – Boda en Otura, Granada',
  description: 'Ceremonia 12:30 en Hotel restaurante Boabdil. Confirma tu asistencia, consulta transporte, parking y alojamiento.',
  keywords: 'boda, Leire, Fran, Granada, Otura, Hotel Boabdil, ceremonia, invitación',
  authors: [{ name: 'Leire & Fran' }],
  openGraph: {
    title: 'Leire & Fran – Boda en Otura, Granada',
    description: 'Ceremonia 12:30 en Hotel restaurante Boabdil. Confirma tu asistencia, consulta transporte, parking y alojamiento.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leire & Fran – Boda en Otura, Granada',
    description: 'Ceremonia 12:30 en Hotel restaurante Boabdil. Confirma tu asistencia, consulta transporte, parking y alojamiento.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}