const express = require('express');
const cors = require('cors');
const { openDb } = require('./database.cjs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the WOD Logger backend!');
});

// Get all WODs
app.get('/api/wods', async (req, res) => {
  try {
    const db = await openDb();
    const wods = await db.all('SELECT * FROM wods ORDER BY date DESC');
    res.json(wods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new WOD
app.post('/api/wods', async (req, res) => {
  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ error: 'Date and content are required' });
  }
  try {
    const db = await openDb();
    const result = await db.run(
      'INSERT INTO wods (date, content) VALUES (?, ?)',
      [date, content]
    );
    res.status(201).json({ id: result.lastID, date, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a WOD
app.put('/api/wods/:id', async (req, res) => {
  const { id } = req.params;
  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ error: 'Date and content are required' });
  }
  try {
    const db = await openDb();
    const result = await db.run(
      'UPDATE wods SET date = ?, content = ? WHERE id = ?',
      [date, content, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'WOD not found' });
    }
    res.json({ id, date, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a WOD
app.delete('/api/wods/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    const result = await db.run('DELETE FROM wods WHERE id = ?', id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'WOD not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});