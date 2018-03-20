const express = require('express');
const app = express();
let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

app.listen(port, (err) => {

  if(err) return console.log('Error connecting to server');

  return console.log('Server started on port: ', port);
});