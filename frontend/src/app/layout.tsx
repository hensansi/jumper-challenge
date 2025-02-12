import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import AppKitProvider from '@/context/appkitProvider';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { wagmiAdapter } from '@/config/wagmi';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jumper Challenge',
  description: 'Powered by WalletConnect',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, headers().get('cookie'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AppKitProvider initialState={initialState}>{children}</AppKitProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
