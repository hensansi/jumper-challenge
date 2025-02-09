'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';
import { projectId, wagmiAdapter } from '@/config/wagmi';
import { createSIWE } from '@/clients/siwe';

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL is not defined');
}

// Set up queryClient
const queryClient = new QueryClient();

// Create a SIWE configuration object
const siweConfig = createSIWE([mainnet]);

// Set up metadata
const metadata = {
  name: 'Jumper Challenge',
  description: 'AppKit Example',
  url: process.env.NEXT_PUBLIC_APP_URL, // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  siweConfig,
  networks: [mainnet],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false, // default to true
    socials: false,
  },
});

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
