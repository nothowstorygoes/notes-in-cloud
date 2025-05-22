"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        const theme = localStorage.getItem('theme');
        const root = document.documentElement;
        if (theme === 'green') {
          root.style.setProperty('--primary-color', '#344e41');
          root.style.setProperty('--secondary-color', '#588157');
          root.style.setProperty('--ternary-color' , '#ffffff');
        } else if (theme === 'violet') {
          root.style.setProperty('--primary-color', '#231942');
          root.style.setProperty('--secondary-color', '#5e548e');
          root.style.setProperty('--ternary-color' , '#ffffff');
        } else {
          root.style.setProperty('--primary-color', '#0d1821');
          root.style.setProperty('--secondary-color', '#344966');
          root.style.setProperty('--ternary-color' , '#ffffff');
        }
      })();
    `,
          }}
        />
        <link rel="manifest" href="/notes-in-cloud/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Notes in Cloud" />
        <meta name="apple-mobile-web-app-title" content="Notes in Cloud" />
        <meta name="theme-color" content="#344966" />
        <meta name="msapplication-navbutton-color" content="#344966" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="/notes-in-cloud/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/notes-in-cloud/splash_screens/iPhone_11__iPhone_XR_landscape.png"
        />

        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/notes-in-cloud/splash_screens/10.2__iPad_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/notes-in-cloud/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/notes-in-cloud/splash_screens/iPhone_11__iPhone_XR_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/notes-in-cloud/splash_screens/10.2__iPad_portrait.png"
        />
        <meta name="msapplication-starturl" content="/notes-in-cloud/" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
