import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import Navbar from './components/Navbar';


export const metadata: Metadata = {
  title: 'Smart Recipe Chatbot',
  description: 'AI-powered cooking assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
