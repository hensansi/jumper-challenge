import { TokenBalance } from 'alchemy-sdk';

import { processedTokensBalances } from '../util';

describe('Token Utils', () => {
  describe('processedTokensBalances', () => {
    it('should return a valid processed balance', async () => {
      // Arrange
      const expectedResponse = [
        {
          name: 'Resolv Liquidity Provider Token',
          balance: 22.53642568555028,
          symbol: 'RLP',
        },
      ];

      // Act
      const balances: TokenBalance[] = [
        {
          contractAddress: '0x4956b52ae2ff65d74ca2d61207523288e4528f96',
          tokenBalance: '0x00000000000000000000000000000000000000000000000138c177c20636b0c5',
          error: null,
        },
      ];
      const metadata = {
        '0x4956b52ae2ff65d74ca2d61207523288e4528f96': {
          decimals: 18,
          logo: null,
          name: 'Resolv Liquidity Provider Token',
          symbol: 'RLP',
        },
      };
      const processedBalances = processedTokensBalances(balances, metadata);

      // Assert
      expect(processedBalances).toEqual(expectedResponse);
    });

    it('should return an empty response on invalid metadata', async () => {
      // Arrange
      const expectedResponse: [] = [];

      // Act
      const balances: TokenBalance[] = [
        {
          contractAddress: '0x6ff539f688aa8338807c0e5b2f466c43c97a0b91',
          tokenBalance: '0x000000000000000000000000000000000000000000000021126c08b5ea8f0000',
          error: null,
        },
      ];
      const metadata = {
        '0x6ff539f688aa8338807c0e5b2f466c43c97a0b91': { decimals: 0, logo: null, name: '', symbol: '' },
      };
      const processedBalances = processedTokensBalances(balances, metadata);

      // Assert
      expect(processedBalances).toEqual(expectedResponse);
    });
  });
});

// '0x6ff539f688aa8338807c0e5b2f466c43c97a0b91': { decimals: 0, logo: null, name: '', symbol: '' },
