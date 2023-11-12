import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Preconnect } from "@/components/Preconnect";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PerformanceReport } from "@/components/PerformanceReport";

const PRECONNECT_URLS = ["https://www.google-analytics.com"];

export const metadata: Metadata = {
  title: "Osman Turan",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {PRECONNECT_URLS.map((href) => (
          <Preconnect key={href} href={href} />
        ))}
      </head>
      <body>
        <>{children}</>
        <GoogleAnalytics />
        <PerformanceReport />
      </body>
    </html>
  );
}
