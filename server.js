const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

app.post('/leads', async (req, res) => {
  try {
    const response = await fetch('https://coinvexra.com/api/leads', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer cvx_ed3a6f09ce46442194a592d313fd7b20',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'ok', service: 'Coinvexra CORS Proxy' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy running on port', PORT));
