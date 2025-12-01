const express = require("express");
const cors = require('cors');
const path = require('path');
const userRoute = require("./routers/userRoute");
const fileRoutes = require("./routers/fileRoutes");
const productRoute = require("./routers/productRoute");
const cartRoute = require("./routers/cartRoute");
// const  cartRoute  = require("./routers/cartRoute");


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', userRoute);
app.use('/api/file', fileRoutes);
app.use('/api/product', productRoute);
app.use("/api/cart", cartRoute);
// Serve static uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

module.exports = app;
