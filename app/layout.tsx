'use client'

import "./globals.css";
import '@telegram-apps/telegram-ui/dist/styles.css';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppRoot } from '@telegram-apps/telegram-ui';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON Connect Demo</title>
      </head>
      <body>
      <AppRoot>
        <TonConnectUIProvider manifestUrl="https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmQJJAdZ2qSwdepvb5evJq7soEBueFenHLX3PoM6tiBffm">
          {children}
        </TonConnectUIProvider>
      </AppRoot>
      </body>
    </html>
  );
}