import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(express.json());

// Enable CORS only for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get timeline data
app.get('/api/timeline', async (req, res) => {
  try {
    const data = await readFile(join(__dirname, '../public/data/timeline.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading timeline data:', error);
    res.status(500).json({ error: 'Failed to read timeline data' });
  }
});

// Update timeline data
app.post('/api/timeline', async (req, res) => {
  try {
    const data = JSON.stringify(req.body, null, 2);
    await writeFile(join(__dirname, '../public/data/timeline.json'), data, 'utf8');
    // Also update the dist directory if it exists
    try {
      await writeFile(join(__dirname, '../dist/data/timeline.json'), data, 'utf8');
    } catch (e) {
      // Ignore error if dist directory doesn't exist
    }
    res.json({ message: 'Timeline data updated successfully' });
  } catch (error) {
    console.error('Error writing timeline data:', error);
    res.status(500).json({ error: 'Failed to update timeline data' });
  }
});

app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`);
});