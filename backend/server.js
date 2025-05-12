const express = require('express')
const app = express()
const db = require('./config/db')
const cors = require('cors');
const port = 3000;

const router = require('./router/router')

app.use(cors());
app.use(express.json())

app.use('/api', router)

app.listen(port, () => console.log(`Server running on port ${port}`))