const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Middleware untuk parsing request body
app.use(express.json());

app.use(cors());

// Contoh data pengguna
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" }
];

// CREATE - Tambah data pengguna (POST)
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// READ - Dapatkan data pengguna berdasarkan ID (GET)
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.json(user);
});

// UPDATE - Perbarui data pengguna (PUT)
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE - Hapus data pengguna (DELETE)
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
