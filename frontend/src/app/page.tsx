import { ConnectButton } from '@/components/ConnectButton';
import TokenList from '@/components/TokenList';

import { Box, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1">Welcome to Jumper challenge!</Typography>
        <ConnectButton />
        <TokenList />
      </Stack>
    </Box>
  );
}
