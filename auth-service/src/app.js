const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // si usas cookies o cabeceras de autenticación
  }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const router = require("./routes");
app.use('/api',router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});