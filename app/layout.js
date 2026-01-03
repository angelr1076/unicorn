import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='light' className='light scroll-smooth'>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
