const express = require('express');
require('./services/passport');
const app = express();
const PORT = process.env.PORT || 5000;

require('./routes/authRoutes')(app);

app.listen(PORT, (err) => {

  if(err) {
    return console.log('Error connecting to server: ', err);
  }

  return console.log('Server started on port: ', PORT);
});