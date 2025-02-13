import { Alchemy, Network, TokenBalance, TokenMetadataResponse } from 'alchemy-sdk';
import { Decimal } from 'decimal.js';

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
export async function getTokenBalances(ethAddress: string): Promise<TokenBalance[]> {
  const balances = await alchemy.core.getTokenBalances(ethAddress);
  return balances.tokenBalances;
}

export async function getTokenMetadata(ethAddress: string): Promise<TokenMetadataResponse> {
  const metadata = await alchemy.core.getTokenMetadata(ethAddress);
  return metadata;
}

// @TODO: Handle numbers hs units with the decimals on a separate field
export const processedTokensBalances = (
  balances: TokenBalance[],
  contractAddressMetadata: Record<string, TokenMetadataResponse>
) => {
  return balances.map((token) => {
    const metadata = contractAddressMetadata[token.contractAddress];

    if (token.tokenBalance && metadata.decimals) {
      const balance = new Decimal(token.tokenBalance).div(new Decimal(10).pow(metadata.decimals)).toNumber();
      return {
        name: metadata.name,
        balance,
        symbol: metadata.symbol,
      };
    }

    return {
      name: metadata.name,
      balance: 0,
      symbol: metadata.symbol,
    };
  });
};
