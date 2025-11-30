import Link from 'next/link';
import Button from '/components/Button';

export default function Dashboard() {
  return (
    <main>
      <h1>Private Dashboard</h1>
      <Link href='/'>Go back home</Link>
      <Button outline color='primary' href='/'>
        Home
      </Button>
    </main>
  );
}
