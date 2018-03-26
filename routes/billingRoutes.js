const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

  app.post('/api/stripe', requireLogin, async (req, res) => {

    res.setHeader('content-type', 'application/javascript');

    console.log('request in /api/stripe: ===============>', req);

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;

    const user = await req.user.save();

    console.log('user in /api/stripe: ===============>', user);

    res.send(user);
  });
};