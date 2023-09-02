const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const db = require('./config/db.js')
const userRoutes = require('./routes/user.js')
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
dotenv.config();

app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is running succesfuly");
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})


