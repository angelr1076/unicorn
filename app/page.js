import Button from '/components/Button';
import ListItem from '/components/ListItem';
import FAQListItem from '/components/FAQListItem';

export default function Home() {
  const isLoggedIn = false;
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
        <div className='max-w-3xl mx-auto flex justify-between items-center px-8 py-2'>
          <div className='font-bold'>Unicorn SaaS</div>
          <div className='space-x-4 max-md:hidden'>
            <a className='link link-hover'>Pricing</a>
            <a className='link link-hover'>FAQ</a>
          </div>
          <Button
            href={isLoggedIn ? '/dashboard' : '/login'}
            color='primary'
            size='lg'>
            {isLoggedIn ? 'Dashboard' : 'Login'}
          </Button>
        </div>
      </section>
      {/* HERO */}
      <section className='text-center px-8 py-32 max-w-3xl mx-auto'>
        <h1 className='text-4xl lg:text-5xl font-extrabold mb-6'>
          Collect customer feedback to build a better product
        </h1>
        <div className='opacity-90 mb-6'>
          Create a feedback board for your product, share it with your
          customers, and prioritize what to build next based on real user
          insights.
        </div>
        <Button
          href={isLoggedIn ? '/dashboard' : '/login'}
          color='primary'
          size='lg'>
          {isLoggedIn ? 'Dashboard' : 'Login'}
        </Button>
      </section>
      {/* PRICING */}
      <section className='bg-base-200 py-32'>
        <div className='px-8 py-32 max-w-3xl mx-auto'>
          <p className='text-sm uppercase font-medium text-primary mb-4 text-center'>
            Pricing
          </p>
          <h2 className='text-center text-3xl lg:text-4xl font-extrabold mb-12'>
            A pricing that adapts to your needs
          </h2>
          <div className='p-8 bg-base-100 max-w-96 rounded-3xl mx-auto space-y-6'>
            <div className='flex gap-2 items-baseline'>
              <div className='text-4xl font-black'>$19</div>
              <div className='uppercase text-sm font-medium opacity-60'>
                /month
              </div>
            </div>
            <ul className='space-y-2'>
              {pricingFeatureList.map(feature => (
                <ListItem key={feature}>{feature}</ListItem>
              ))}
            </ul>
            <Button
              href={isLoggedIn ? '/dashboard' : '/login'}
              color='primary'
              size=''
              className='btn w-full mt-4'>
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </Button>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className='bg-base-200 py-32'>
        <div className='px-8 py-32 max-w-3xl mx-auto'>
          <p className='text-sm uppercase font-medium text-primary mb-4 text-center'>
            FAQ
          </p>
          <h2 className='text-3xl lg:text-4xl font-extrabold mb-12 text-center'>
            Frequently Asked Questions
          </h2>
          <ul className='max-w-lg mx-auto'>
            {[
              {
                question: 'Can I change my plan later?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time from your account settings.',
              },
              {
                question: 'What payment methods do you accept?',
                answer:
                  'We accept all major credit cards including Visa, MasterCard, American Express, and Discover.',
              },
              {
                question: 'Is there a discount for annual subscriptions?',
                answer:
                  'Yes, we offer a 20% discount for annual subscriptions paid upfront.',
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
