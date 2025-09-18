import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Computer Science",
  description: "Dynamic Navigation Example",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className="text-4xl font-bold mb-4">Computer Science</h1>
        <Navbar />  {/* ✅ Dynamic Navigation */}
        <main>{children}</main>
        <footer className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Computer Science. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
