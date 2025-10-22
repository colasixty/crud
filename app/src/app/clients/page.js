'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Box,
} from '@mui/material';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('http://localhost:8000/api/clients')
      .then((res) => setClients(res.data))
      .catch((err) => console.error('Error fetching clients:', err));
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/clients/${id}`);
      fetchClients(); // Refresh list
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={3}>
        <Button variant="contained">Download CSV</Button>
      </Box>

      <Box px={2} mb={2}>
        <Link href="/" passHref>
          <Button variant="outlined">← Back to Add Client</Button>
        </Link>
      </Box>

      <Box px={2}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Client Name</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Cell</strong></TableCell>
                <TableCell><strong>Comments</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} hover sx={{ borderBottom: 'none' }}>
                  <TableCell>{`${client.first_name} ${client.last_name}`}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.dob}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.comment}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Link href={`/edit/${client.id}`} passHref>
                        <Button size="small" variant="outlined">Edit</Button>
                      </Link>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(client.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}