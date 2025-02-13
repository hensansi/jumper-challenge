const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type TokenData = {
  name: string;
  balance: number;
  symbol: string;
};

const getTokenList = async (address: string): Promise<{ tokenBalances: TokenData[] }> => {
  const res = await fetch(`${BASE_URL}/address/${address}/token-list`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  return data.responseObject;
};

export const api = { getTokenList };
