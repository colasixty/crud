const express = require('express');
const router = express.Router();
const db = require('./db');

// POST /api/clients
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    dob,
    email,
    phone,
    company,
    price,
    comments
  } = req.body;

  const parsedPrice = parseFloat(price);

  try {
    const [result] = await db.execute(
      `INSERT INTO clients 
        (first_name, last_name, address, dob, email, phone, company_name, price, comment) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        address,
        dob,
        email,
        phone,
        company,
        parsedPrice,
        comments
      ]
    );

    res.status(201).json({ message: 'Client added', clientId: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to insert client' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM clients');
    res.json(results);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM clients WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Client not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching client:', err);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    address,
    dob,
    email,
    phone,
    company_name,
    price,
    comment
  } = req.body;

  try {
    await db.execute(
      `UPDATE clients SET 
        first_name = ?, last_name = ?, address = ?, dob = ?, 
        email = ?, phone = ?, company_name = ?, price = ?, comment = ?
      WHERE id = ?`,
      [
        first_name,
        last_name,
        address,
        dob,
        email,
        phone,
        company_name,
        parseFloat(price),
        comment,
        id
      ]
    );

    res.json({ message: 'Client updated successfully' });
  } catch (err) {
    console.error('Error updating client:', err);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM clients WHERE id = ?', [id]);
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

module.exports = router;