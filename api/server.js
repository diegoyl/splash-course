const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com"

// GETTING VIDEOS FROM USER
app.get("/api/videos", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const targetUrl = `${API_URL}/api/videos?user_id=${user_id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error proxying request");
  }
});


// POSTING NEW VIDEO
app.post("/api/videos", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error proxying request");
  }
});


// GETTING COMMENTS
app.get("/api/videos/comments", async (req, res) => {
  try {
    const video_id = req.query.video_id;
    const targetUrl = `${API_URL}/api/videos/comments?video_id=${video_id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error proxying comments");
  }
});


// POSTING NEW COMMENT
app.post("/api/videos/comments", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/api/videos/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error proxying request");
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
