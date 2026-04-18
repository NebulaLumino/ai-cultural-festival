import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Cultural Festival',
  description: 'Design cultural festivals celebrating heritage with community and scale in mind.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
