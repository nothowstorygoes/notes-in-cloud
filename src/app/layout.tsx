import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes in Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="manifest.json" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Notes in) Cloud" />
      <meta name="apple-mobile-web-app-title" content="Notes in Cloud" />
      <meta name="theme-color" content="#344966" />
      <meta name="msapplication-navbutton-color" content="#344966" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="msapplication-starturl" content="/notes-in-cloud/" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <link rel="icon" sizes="192x192" href="/icons/logo/ico192" />
      <link rel="apple-touch-icon" sizes="192x192" href="/icons/logo/ico192" />
      <link rel="icon" sizes="256x256" href="/icons/logo/ico256" />
      <link rel="apple-touch-icon" sizes="256x256" href="/icons/logo/ico256" />
      <link rel="icon" sizes="384x384" href="/icons/logo/ico384" />
      <link rel="apple-touch-icon" sizes="384x384" href="/icons/logo/ico384" />
      <link rel="icon" sizes="512x512" href="/icons/logo/ico512" />
      <link rel="apple-touch-icon" sizes="512x512" href="/icons/logo/ico512" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
