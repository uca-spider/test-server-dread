const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Middleware untuk parsing request body
app.use(express.json());
app.use(cors());

// Contoh data ancaman
let threats = [];

// CREATE - Tambah ancaman dengan skor DREAD (POST)
app.post("/threats", (req, res) => {
  const { name, damage, reproducibility, exploitability, affected_users, discoverability } = req.body;

  if (!name || !damage || !reproducibility || !exploitability || !affected_users || !discoverability) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const riskScore = (damage + reproducibility + exploitability + affected_users + discoverability) / 5;

  let description;
  if (riskScore <= 3) description = "Low risk";
  else if (riskScore <= 6) description = "Medium risk";
  else description = "High risk";

  const newThreat = {
    id: threats.length + 1,
    name,
    damage,
    reproducibility,
    exploitability,
    affected_users,
    discoverability,
    riskScore,
    description
  };

  threats.push(newThreat);
  res.status(201).json(newThreat);
});

// READ - Dapatkan ancaman berdasarkan ID (GET)
app.get("/threats/:id", (req, res) => {
  const threatId = parseInt(req.params.id);
  const threat = threats.find((t) => t.id === threatId);

  if (!threat) {
    return res.status(404).json({ error: "Threat not found." });
  }

  res.json(threat);
});

// DELETE - Hapus ancaman berdasarkan ID (DELETE)
app.delete("/threats/:id", (req, res) => {
  const threatId = parseInt(req.params.id);

  const threatIndex = threats.findIndex((t) => t.id === threatId);

  if (threatIndex === -1) {
    return res.status(404).json({ error: "Threat not found." });
  }

  threats.splice(threatIndex, 1);
  res.status(204).send();
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
