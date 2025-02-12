const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTokenList = async (address: string): Promise<boolean> => {
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
