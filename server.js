const express = require('express');

require('./services/passport');
const app = express();
// const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;

// authRoutes(app);
// this require returns a function and we immediately call it with app
require('./routes/authRoutes')(app);

app.listen(PORT, (err) => {

  if(err) return console.log('Error connecting to server: ', err);

  return console.log('Server started on port: ', PORT);
});