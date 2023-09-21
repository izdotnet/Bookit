import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Provider from "./provider";
import AuthChecker from "@/components/AuthChecker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookit - Apartment booking platform",
  description: "Book your next apartment with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} relative h-full`}>
        <Provider>
          <AuthChecker>
            <Navbar />
            {children}
            <Footer />
          </AuthChecker>
        </Provider>
      </body>
    </html>
  );
}
