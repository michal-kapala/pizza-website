const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

// **** MONGODB ****

const mongoose = require("mongoose");
// **** MongoDB Config ****

const { mongoURL } = require("./src/config/DatabaseConfig.js");
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To handle deprecation of findAndModify mongo
mongoose.set("useFindAndModify", false);

// **** END MongoDB Config ****

const productsRoute = require("./src/routes/Products");
app.use("/", productsRoute);

const ordersRoute = require("./src/routes/Orders");
app.use("/", ordersRoute);

const usersRoute = require("./src/routes/Users");
app.use("/", usersRoute);

const offersRoute = require("./src/routes/Offers");
app.use("/offers", offersRoute);

// **** END MongoDB ****

// **** Mailjet ****
const mailjetRoute = require("./src/routes/Mailjet");
app.use("/", mailjetRoute);

// **** Config Deploy ****
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// **** END Config Deploy ****

// https config
const options = {
  key: fs.readFileSync('./key.pem'), // Replace with the path to your key
  cert: fs.readFileSync('./cert.pem') // Replace with the path to your certificate
}

const PORT = process.env.PORT || 3001;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
