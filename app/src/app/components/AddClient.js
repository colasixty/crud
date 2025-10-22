'use client';

import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

const AddClient = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    email: '',
    phone: '',
    company: '',
    price: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
        const response = await axios.post('http://localhost:8000/api/clients', formData);
        alert('Client added successfully!');
        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            dob: '',
            email: '',
            phone: '',
            company: '',
            price: '',
            comments: ''
        });
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box px={2}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Client
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* First Row: First Name, Last Name, Address */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="firstName">First Name</label>
                  <TextField
                    id="firstName"
                    name="firstName"
                    variant="outlined"
                    size="small"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="lastName">Last Name</label>
                  <TextField
                    id="lastName"
                    name="lastName"
                    variant="outlined"
                    size="small"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="address">Address</label>
                  <TextField
                    id="address"
                    name="address"
                    variant="outlined"
                    size="small"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>

              {/* Second Row: Date of Birth, Email, Phone */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="dob">Date of Birth</label>
                  <TextField
                    id="dob"
                    name="dob"
                    type="date"
                    variant="outlined"
                    size="small"
                    value={formData.dob}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="email">Contact Email</label>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="phone">Contact Cell Number</label>
                  <TextField
                    id="phone"
                    name="phone"
                    type="tel"
                    variant="outlined"
                    size="small"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>

              {/* Third Row: Company, Price, Comments */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="company">Company Name</label>
                  <TextField
                    id="company"
                    name="company"
                    variant="outlined"
                    size="small"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="price">Price</label>
                  <TextField
                    id="price"
                    name="price"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box display="flex" flexDirection="column">
                  <label htmlFor="comments">Comments</label>
                  <TextField
                    id="comments"
                    name="comments"
                    variant="outlined"
                    size="small"
                    value={formData.comments}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={1}
                  />
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12 }}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    >
                    Submit
                    </Button>
                </Box>          
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddClient;