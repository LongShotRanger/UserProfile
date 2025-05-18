'use client';

import { DarkModeProvider } from '../context/DarkModeContext';
import Header from '../components/header';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <Header />
      <main className="max-w-5xl mx-auto">{children}</main>
    </DarkModeProvider>
  );
}