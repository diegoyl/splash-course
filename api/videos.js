import fetch from "node-fetch";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
        const user_id = req.query.user_id;
        const targetUrl = `${API_URL}/api/videos?user_id=${user_id}`;
        const response = await fetch(targetUrl);
        const data = await response.json();
        return res.status(200).json(data);
    } 
    else if (req.method === "POST") {
        const response = await fetch(`${API_URL}/api/videos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        return res.status(200).json(data);
    }
    else {
        return res.status(405).send("invalid method");
    }
  } catch (err) {
        console.error(err);
        return res.status(500).send("Error proxying request");
  }
}
