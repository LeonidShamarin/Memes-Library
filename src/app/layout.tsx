import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memes Library",
  description: "Колекція найкращих мемів",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
    
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} Memes Library</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
