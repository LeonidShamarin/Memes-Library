import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the table page by default
  redirect('/table');
}

