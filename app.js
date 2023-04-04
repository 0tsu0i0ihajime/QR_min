const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/QRReader-min.html");
});

app.post("/data", (req, res) => {
  const qrCodeData = req.body.QRCodeData;
  const validQRCodeData = "validQRCodeData";

  if (qrCodeData === validQRCodeData) {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    res.cookie("authToken", "validToken", { expires: expires });
    res.redirect("/Hello.html");
  } else {
    res.send("Invalid QR Code Data");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
