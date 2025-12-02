import Link from 'next/link';
import Button from '/components/Button';

export default function Dashboard() {
  const isLoggedIn = false;

  return (
    <main>
      <h1>Private Dashboard</h1>
      <Link href='/'>Go back home</Link>
      <Button
        href={isLoggedIn ? '/dashboard' : '/login'}
        color='secondary'
        size='lg'>
        {isLoggedIn ? 'Dashboard' : 'Login'}
      </Button>
    </main>
  );
}
