var express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

const PORT = process.env.PORT || 7000

app.listen(PORT, () => console.log(`Running on port ${PORT}.`))