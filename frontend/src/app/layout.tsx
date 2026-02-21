import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'TaxLayer | Web3 Dashboard',
  description: 'High-fidelity dark-themed Web3 dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-mono bg-[#F4F4F5] dark:bg-[#000000] text-[#09090B] dark:text-[#FFFFFF] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
