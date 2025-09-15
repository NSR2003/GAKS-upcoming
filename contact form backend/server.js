// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { google } = require("googleapis");
const fs = require("fs");

const app = express();

// --- CORS (allow your front-end) ---
const allowed = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: function (origin, cb) {
    // Allow same-origin or tools like Postman with no origin
    if (!origin) return cb(null, true);
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked"), false);
  }
}));

// --- JSON body parsing ---
app.use(express.json());

// --- Basic rate limiting to reduce spam ---
app.use("/api/", rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5               // 5 requests per minute per IP
}));

// --- Google Sheets auth (Service Account) ---
const credentials = JSON.parse(fs.readFileSync("credentials.json", "utf-8"));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
const sheets = google.sheets({ version: "v4", auth });

// --- Helpers ---
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const SHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Sheet1!A:D"; // Timestamp | Name | Email | Message

// --- Health check ---
app.get("/health", (req, res) => res.send("ok"));

// --- Contact endpoint ---
app.post("/api/contact", async (req, res) => {
  try {
    let { name, email, message } = req.body || {};
    name = (name || "").trim();
    email = (email || "").trim();
    message = (message || "").trim(); // optional

    // Validate: name & email required
    if (!name) return res.status(400).json({ success: false, error: "Name is required." });
    if (!email) return res.status(400).json({ success: false, error: "Email is required." });
    if (!isValidEmail(email)) return res.status(400).json({ success: false, error: "Invalid email." });

    // Append to Google Sheet
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, name, email, message]]
      }
    });

    res.json({ success: true, message: "Saved to Google Sheet." });
  } catch (err) {
    console.error("Sheets error:", err?.response?.data || err);
    res.status(500).json({ success: false, error: "Server error, please try again later." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running on http://localhost:${port}`);
});
