import { Alchemy, Network, TokenBalancesResponse } from 'alchemy-sdk';

import { env } from '@/common/utils/envConfig';

// Interface for the Alchemy settings
interface AlchemySettings {
  apiKey: string;
  network: Network;
}

// Alchemy configuration settings
const settings: AlchemySettings = {
  apiKey: env.ALCHEMY_API_JEY, // Replace with your Alchemy API Key
  network: Network.ETH_MAINNET,
};

// Initialize Alchemy instance
const alchemy: Alchemy = new Alchemy(settings);

// Async function to fetch token balances
export async function getTokenBalances(ethAddress: string): Promise<TokenBalancesResponse | undefined> {
  try {
    const balances: TokenBalancesResponse = await alchemy.core.getTokenBalances(ethAddress);
    return balances;
  } catch (error) {
    console.error('Error fetching token balances:', error);
  }
}
