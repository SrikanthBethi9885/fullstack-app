const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

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

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-01-16&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

//const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`

app.get('/news', async (req, res) => {
  try {
    // Make a request to the News API
    const response = await axios.get(NEWS_API_URL);

    // Handle the API response and extract relevant data
    const articles = response.data.articles;

    // Send the articles as a JSON response
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching news from News API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to fetch customers
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers');
    res.json(rows);
    console.log('Hello Srikanth Bethi')
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

// PUT method to update a customer
app.put('/api/updateCustomer/:Id', async (req, res) => {
  const Id = req.params.Id;
  const { name, address, customerid } = req.body;

  try {
    // Check if the customer with the specified ID exists
    const [existingRows] = await pool.execute('SELECT * FROM customers WHERE Id = ?', [Id]);

    if (existingRows.length === 0) {
      return res.status(404).send('Customer not found');
    }

    // Update the customer details
    await pool.execute('UPDATE customers SET name = ?, address = ?, customerid = ? WHERE Id = ?', [name, address, customerid, Id]);

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
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
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Server Error');
  }
});

// Handle signup POST request
app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password before storing it in the database
    //const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

    const [result] = await pool.execute('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
    console.log('User signed up successfully:', result);
    res.status(200).send('User signed up successfully');
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists in the database
    const [userRows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (userRows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = userRows[0];
    // Compare the provided password with the stored hashed password
    //const passwordMatch = await bcrypt.compare(password, user.password);
    if (user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log('User Rows:', userRows);
    console.log('Provided Password:', password);
    //console.log('Password Match:', passwordMatch);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
