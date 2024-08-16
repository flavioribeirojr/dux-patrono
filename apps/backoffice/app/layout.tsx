import './globals.css';
import { Inter as FontSans } from 'next/font/google';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Dux Patrono Backoffice',
  description: 'Gerenciador da loja',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${fontSans.variable} bg-background text-foreground font-sans`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
