'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function TokensPage() {
  const { address } = useAppKitAccount();
  const [tokens, setTokens] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      console.log('No address - please connect first');
      return;
    }

    const fetchTokens = async () => {
      try {
        const result = await api.getTokenList(address);
        setTokens(result);
      } catch (err) {
        setError('Failed to fetch tokens');
      }
    };

    fetchTokens();
  }, [address]);

  return address ? (
    <div>
      <div>Connected Address: {address}</div>
      <pre>{JSON.stringify(tokens)}</pre>
    </div>
  ) : null;
}
