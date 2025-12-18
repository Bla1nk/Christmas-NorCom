import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weihnachtsgruß für Kundinnen, Partner und Freunde',
  description: 'Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.',
  openGraph: {
    title: 'Weihnachtsgruß für Kundinnen, Partner und Freunde',
    description: 'Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weihnachtsgruß für Kundinnen, Partner und Freunde',
    description: 'Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
