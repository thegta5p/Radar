import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
const inter = Inter({ subsets: ["latin"] });

const cliendID =
  "945465335228-kstnrqd7gqhg9dt9s75dqgtto9ra2u3c.apps.googleusercontent.com";

export const metadata: Metadata = {
  title: "Radar",
  description: "An application to bring gamers together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <GoogleOAuthProvider clientId={cliendID}>
              {children}
            </GoogleOAuthProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
}
