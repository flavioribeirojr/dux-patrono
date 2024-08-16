import { ReactNode } from 'react';

export default function AuthLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <main className='min-h-dvh flex items-center justify-center bg-black'>
      { children }
    </main>
  );
}