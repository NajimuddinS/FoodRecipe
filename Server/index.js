const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./model/auth.model.js");
const connectDB = require("./config/db.js");
const food = require("./Routes/food.js");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/food", food);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  const { Username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ Username, email, password: hashedPassword });
    res.json({ message: "User Registered Successfully", user });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Protected data", user: verified });
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
