const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.listen(3000);