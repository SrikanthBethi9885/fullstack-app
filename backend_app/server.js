const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// GET method to fetch customers
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers');
    res.json(rows);
    console.log('Hello')
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Server Error');
    
  }
});
app.get('/api/customers/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [customerId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).send('Server Error');
  }
})

// POST method to add a new customer
app.post('/api/addCustomer', async (req, res) => {
  const { Id, name, address, customerid } = req.body;

    try {
      await pool.execute('INSERT INTO customers ( name, address, customerid) VALUES (?, ?, ?)', [name, address, customerid]);
        res.json({ message: 'Customer added successfully' });
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).send('Server Error');
    }
});

// Add this route to handle customer deletion
app.delete('/api/deleteCustomer/:Id', async (req, res) => {
  const Id = req.params.Id;

  try {
    // Delete the customer with the specified ID from the database
    await pool.execute('DELETE FROM customers WHERE Id = ?', [Id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
