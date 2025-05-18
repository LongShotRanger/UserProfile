// app/layout.tsx
import '../styles/globals.css';
import ClientWrapper from './components/ClientWrapper';

export const metadata = {
  title: 'Crosstrekrentals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
