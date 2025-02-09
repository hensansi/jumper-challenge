import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet } from '@reown/appkit/networks';

if (!process.env.NEXT_PUBLIC_REOWN_PROJECT_ID) {
  throw new Error('Project ID is not defined');
}

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

export const networks = [mainnet];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
