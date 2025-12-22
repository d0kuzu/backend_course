import express from 'express';
import cors from 'cors';
import { DB, users } from './improvised_db.js';


const app = express();
const PORT = 3000;

app.use(cors());

// middleware для JSON body
app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.send("Hello user")
});

app.get('/json', (req, res) => {
  res.json({text: "hi", number: [1,2,3]});
});

app.get('/profile/:username', (req, res) => {
  res.send("Profile page of " + req.params.username);
})

app.get('/users', (req, res) => {
  res.json(users);
})
app.post('/users', (req, res) => {
  const { name } = req.body

  DB.create(name)

  res.status(201).json({status: "ok"});
})
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body
  DB.update(id, name)
})
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if (DB.delete(id)) res.json({status: "ok"});
  else res.json({status: "user does not exist"});

})

// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
