import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Route proxy
app.get("/api/news", async (req, res) => {
  try {
    const query = req.query.q || "indonesia";
    const apiKey = "4549685ccbaf45d09330934738a54182";
    const url = `https://newsapi.org/v2/everything?q=${query}&language=id&sortBy=publishedAt&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Jalankan server proxy di port 5000
app.listen(5000, () => console.log("✅ Proxy server berjalan di http://localhost:5000"));
