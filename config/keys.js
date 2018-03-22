if(process.env.NODE_ENV === 'production') {
  //return prod config
  module.exports = require('./prod');
} else {
  //return dev config
  module.exports = require('./dev');
}