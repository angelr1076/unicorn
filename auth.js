import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './libs/mongo.js';

const config = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: 'no-reply@automatiq.space',
      name: 'Email',
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
