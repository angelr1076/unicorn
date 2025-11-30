import Link from 'next/link';
import Button from '/components/Button';

export default function Home() {
  return (
    <main>
      <h1>Collect customer feedback to build a better product</h1>
      <div>
        Create a feedback board for your product, share it with your customers,
        and prioritize what to build next based on real user insights.
      </div>
      <Button outline color='primary' href='/dashboard'>
        Dashboard
      </Button>
    </main>
  );
}
