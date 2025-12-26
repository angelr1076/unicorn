import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './libs/mongo';

import connectDB from '@/libs/mongoose';
import User from '@/models/User';

const config = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: 'no-reply@automatiq.space',
      name: 'Email',
    }),

    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      await User.findOneAndUpdate(
        { email: user.email },
        {
          $setOnInsert: {
            email: user.email,
            firstName: user.name?.split(' ')[0] || 'User',
            lastName: user.name?.split(' ').slice(1).join(' ') || 'Account',
          },
        },
        { upsert: true }
      );

      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
