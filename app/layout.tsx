import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "F1 Stats Dashboard | Comprehensive Formula 1 Statistics",
  description:
    "Real-time Formula 1 driver statistics, live telemetry, race calendar, and historical data analysis",
  keywords: [
    "F1",
    "Formula 1",
    "statistics",
    "telemetry",
    "racing",
    "drivers",
    "standings",
  ],
  authors: [{ name: "F1 Stats" }],
  openGraph: {
    title: "F1 Stats Dashboard",
    description: "Comprehensive Formula 1 statistics and analytics",
    type: "website",
  },
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
