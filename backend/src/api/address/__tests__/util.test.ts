import { TokenBalance } from 'alchemy-sdk';

import { processedTokensBalances } from '../util';

describe('Token Utils', () => {
  describe('processedTokensBalances', () => {
    it('should return processed balance', async () => {
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
  });
});
