import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://norcom-weihnachten.de"),
  title: "Weihnachtsgruß für Kundinnen, Partner und Freunde",
  description: "Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.",
  openGraph: {
    title: "Weihnachtsgruß für Kundinnen, Partner und Freunde",
    description: "Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og.jpg", // liegt in /public/og.jpg
        width: 1200,
        height: 630,
        alt: "NorCom Weihnachtsgruß",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weihnachtsgruß für Kundinnen, Partner und Freunde",
    description: "Herzliche Weihnachtsgrüße und Dank für die Zusammenarbeit.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}