const router = require('express').Router();
const { Pool } = require('pg');


const pool = new Pool({
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

// Add Consultant
router.route('/add').post(async (req, res) => {
  const { name, skill } = req.body;

  const query = 'INSERT INTO consultants (name, skill) VALUES ($1, $2) RETURNING *';
  const values = [name, skill];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get Consultants
router.route('/').get(async (req, res) => {
  const query = 'SELECT * FROM consultants';

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get Consultant by Id
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM consultants WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update Consultant
router.route('/update/:id').post(async (req, res) => {
  const { id } = req.params;
  const { name, skill } = req.body;
  const query = 'UPDATE consultants SET name = $1, skill = $2 WHERE id = $3 RETURNING *';
  const values = [name, skill, id];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Delete Consultant
<
// router.route('/delete/:id').delete(async (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM consultants WHERE id = $1';
//   const values = [id];

//   try {
//     await pool.query(query, values);
//     res.json('Consultant deleted.');
//   } catch (err) {
//     res.status(400).json('Error: ' + err);
//   }
// });
app.delete('/api/consultants/:id', (req, res) => {
  const consultants_ID = parseInt(req.params.id);
  connection.query('DELETE FROM posts WHERE consultants_id = $1', [consultants_ID], (err, result) => {
      if (err) {
          console.error('Error deleting consultants:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
      }
      res.json({ consultants_id: consultants_ID, message: 'Consultant deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
router.route('/delete/:id').delete(async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM consultants WHERE id = $1';
  const values = [id];

  try {
    await pool.query(query, values);
    res.json('Consultant deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


export default router;