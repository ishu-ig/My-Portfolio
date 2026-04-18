const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();        // Load env
require("./db_connect");           // DB connection

const app = express();
const Router = require("./routes/index");

// ✅ Allowed Origins
const whitelist = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
  "http://localhost:8000",
  "https://my-portfolio-uahq.onrender.com",
  "https://portfolio-fawn-pi-94.vercel.app"
];

// ✅ CORS config
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked Origin:", origin);
      callback(new Error("CORS Error: Not authorized"));
    }
  },
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Static files (uploads)
app.use("/public", express.static("public"));

// ✅ API routes
app.use("/api", Router);

// ==================================================
// ✅ OPTIONAL: Serve React build (ONLY if hosted here)
// ==================================================

app.use(express.static(path.join(__dirname, "client/build")));

// ✅ FIXED wildcard (Express 5 compatible)
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// ==================================================

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});