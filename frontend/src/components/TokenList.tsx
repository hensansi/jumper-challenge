'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { api, TokenData } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function TokensPage() {
  const { address } = useAppKitAccount();
  const [tokens, setTokens] = useState<TokenData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      console.log('No address - please connect first');
      return;
    }

    const fetchTokens = async () => {
      try {
        const result = await api.getTokenList(address);
        setTokens(result.tokenBalances);
      } catch (err) {
        setError('Failed to fetch tokens');
      }
    };

    fetchTokens();
  }, [address]);

  return address && tokens?.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
}
