'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

const ButtonLogin = ({ session, extraStyle = '' }) => {
  const dashboardUrl = '/dashboard';

  if (session) {
    return (
      <Link href={dashboardUrl} className={`btn btn-primary ${extraStyle}`}>
        Go to dashboard
      </Link>
    );
  }

  return (
    <button
      className={`btn btn-primary ${extraStyle}`}
      onClick={() => signIn(undefined, { callbackUrl: dashboardUrl })}>
      Get started
    </button>
  );
};

export default ButtonLogin;
