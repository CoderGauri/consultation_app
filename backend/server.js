const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to PostgreSQL

// const pool = new Pool({
//   user: 'your_user',
//   host: 'localhost',
//   database: 'your_database',
//   password: 'your_password',
//   port: 5432,
// });
const connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // Set to false if using self-signed certificates
        // You may need to provide other SSL options such as ca, cert, and key
        // Example:
        // ca: fs.readFileSync('path/to/ca-certificate.crt'),
        // cert: fs.readFileSync('path/to/client-certificate.crt'),
        // key: fs.readFileSync('path/to/client-certificate.key')
    },
});
connection.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

connection.query(`
CREATE TABLE IF NOT EXISTS consultants (
    consultant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL, -- Using VARCHAR with a length of 255 characters for skills
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`, (err, res) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
});
// Routes


// Start Server
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Welcome to blogpost"));

// Create a new post
app.post('/api/consultants', (req, res) => {
    const { name, skills } = req.body;
    const query = 'INSERT INTO consultants (name, skills) VALUES ($1, $2) RETURNING *';
    const values = [name, skills];
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(201).json(result.rows[0]);
    });
});

// Get all posts
app.get('/api/consultants', (req, res) => {
    connection.query('SELECT * FROM consultants', (err, results) => {
        if (err) {
            console.error('Error getting consultants:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(results.rows);
    });
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    connection.query('SELECT * FROM posts WHERE post_id = $1', [postId], (err, results) => {
        if (err) {
            console.error('Error getting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const post = results.rows[0];
        res.json(post);
    });
});

// Update a post by ID
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { postName, description } = req.body;
    const query = 'UPDATE posts SET postname = $1, description = $2 WHERE post_id = $3 RETURNING *';
    const values = [postName, description, postId];
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(result.rows[0]);
    });
});

// Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    connection.query('DELETE FROM posts WHERE post_id = $1', [postId], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json({ post_id: postId, message: 'Post deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});