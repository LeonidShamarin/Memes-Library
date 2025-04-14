import './globals.css';
import type { Metadata } from 'next';
import Navigation from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Довідник Мемів',
  description: 'Популярні меми у таблиці та списком'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-grow py-4">{children}</main>
        <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-gray-500 dark:text-gray-400 text-sm mt-auto">
          <div className="container mx-auto px-4">
            Довідник Мемів &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}