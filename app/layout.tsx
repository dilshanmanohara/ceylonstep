import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CeylonStep",
  description: "CeylonStep - Premier vehicle rentals in Sri Lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden relative min-h-screen`}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.13) 0%, rgba(30,41,59,0.0) 60%), linear-gradient(120deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)`,
        }}
      >
        {/* Modern blue dot SVG pattern overlay */}
        <div aria-hidden="true" className="pointer-events-none select-none fixed inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.18'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }} />
        </div>
        {/* Soft blue radial glow behind main content */}
        <div aria-hidden="true" className="pointer-events-none select-none absolute left-1/2 top-0 -translate-x-1/2 z-0" style={{width: '60vw', height: '40vh', filter: 'blur(60px)', background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.0) 80%)'}} />
        <div className="relative z-10">
          <Header />
          <div className="pt-2 md:pt-2">
            {children}
          </div>
          <Footer />
          <WhatsAppFloat />
        </div>
      </body>
    </html>
  );
}
