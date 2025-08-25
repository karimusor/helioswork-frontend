import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import { baseMetadata } from "@/lib/seo";
import { ToastProvider } from "@/components/ui/use-toast";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = baseMetadata;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <ToastProvider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 pt-8">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}