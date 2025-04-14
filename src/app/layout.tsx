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
    <html lang="uk">
      <body className="bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
