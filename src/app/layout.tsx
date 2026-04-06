import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portwise — Tariff Intelligence for Global Trade",
  description:
    "Real-time tariff rates, policy change alerts, and sourcing scenario modeling. Powered by official US government data and AI analysis.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Portwise — Tariff Intelligence for Global Trade",
    description:
      "Real-time tariff rates, policy change alerts, and sourcing scenario modeling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-navy antialiased">
        {children}
      </body>
    </html>
  );
}
