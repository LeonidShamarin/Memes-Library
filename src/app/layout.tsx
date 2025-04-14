import "./globals.css";
import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/react";
import Navigation from "../components/Navbar";

export const metadata: Metadata = {
  title: "Meme Directory",
  description: "Popular memes in a table and list format",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
        <HeroUIProvider>
          <Navigation />
          <main className="flex-grow py-4 container mx-auto px-4">
            {children}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-gray-500 dark:text-gray-400 text-sm mt-auto">
            <div className="container mx-auto px-4">
              Meme Directory &copy; {new Date().getFullYear()}
            </div>
          </footer>
        </HeroUIProvider>
      </body>
    </html>
  );
}
