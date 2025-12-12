import Button from '@/components/Button';
import ListItem from '@/components/ListItem';
import FAQListItem from '@/components/FAQListItem';
import Image from 'next/image';
import productDemo from './productDemo.jpeg';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session;

  const pricingFeatureList = [
    'Unlimited feedback boards',
    'Custom domains',
    'Priority support',
    'Team accounts',
  ];

  return (
    <main>
      {/* HEADER */}
      <section className='bg-base-200'>
        <div className='max-w-5xl mx-auto flex justify-between items-center px-8 py-2'>
          <div className='font-bold'>Unicorn SaaS</div>

          <div className='space-x-4 max-md:hidden'>
            <a className='link link-hover' href='#pricing'>
              Pricing
            </a>
            <a className='link link-hover' href='#faq'>
              FAQ
            </a>
          </div>

          <Button href={isLoggedIn ? '/dashboard' : '/api/auth/signin'}>
            {isLoggedIn ? 'Dashboard' : 'Login'}
          </Button>
        </div>
      </section>

      {/* HERO */}
      <section className='flex flex-col lg:flex-row gap-14 items-center px-8 py-32 max-w-5xl mx-auto'>
        <Image
          src={productDemo}
          alt='Product Demo'
          className='w-96 rounded-xl'
        />
        <div>
          <h1 className='text-4xl font-extrabold mb-6'>
            Collect customer feedback to build a better product
          </h1>
          <p className='opacity-90 mb-6'>
            Create a feedback board, share it, and prioritize what to build
            next.
          </p>

          <Button href={isLoggedIn ? '/dashboard' : '/api/auth/signin'}>
            {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </div>
      </section>

      {/* PRICING */}
      <section className='bg-base-200 py-32' id='pricing'>
        <div className='max-w-3xl mx-auto px-8'>
          <h2 className='text-center text-4xl font-extrabold mb-12'>Pricing</h2>

          <div className='p-8 bg-base-100 max-w-96 rounded-3xl mx-auto'>
            <ul className='space-y-2'>
              {pricingFeatureList.map(f => (
                <ListItem key={f}>{f}</ListItem>
              ))}
            </ul>

            <Button
              href={isLoggedIn ? '/dashboard' : '/api/auth/signin'}
              className='w-full mt-6'>
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='bg-base-200 py-32' id='faq'>
        <div className='max-w-3xl mx-auto px-8'>
          <h2 className='text-center text-4xl font-extrabold mb-12'>FAQ</h2>
          <ul>
            {[
              { question: 'Can I change my plan?', answer: 'Yes.' },
              {
                question: 'What payments are accepted?',
                answer: 'All major cards.',
              },
            ].map(qa => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
