'use client';

import AddClient from "./components/AddClient";
import Link from 'next/link';
import { Box, Button, Grid } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ width: '100%', px: 0, mx: 0 }}>
      <Grid container spacing={0}>
        {/* Left Column: Clients Button */}
        <Grid sx={{ py: 2 }} size={{ xs: 12, sm: 2 }}>
          <Box sx={{ p: 2 }}>
            <Link href="/clients" passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Clients
              </Button>
            </Link>
          </Box>
        </Grid>

        {/* Right Column: AddClient Form */}
        <Grid size={{ xs: 12, sm: 10 }}>
          <AddClient />
        </Grid>
      </Grid>
    </Box>
  );
}