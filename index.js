const express = require('express');
const router = require('./routes/router.js').router;
const bodyParser = require("body-parser")
const app = express();
const PORT = 6000;
app.use(bodyParser());
//app.use(express.json())
app.use("/users", router)
app.listen(PORT, (req, res) => {
    console.log(`the server running on ${PORT}`)
});
