const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');



module.exports = (app) => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting');
  });

  app.post('/api/surveys/webhooks', (req, res) => {

    const events = _.map(req.body, (event) => {

      const pathName = new URL(event.url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');

      const match = p.test(pathName);

      if(match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }

    });

    const compactEvents = _.compact(events);

    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    console.log('finally ====>', uniqueEvents);
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body, 
      recipients: recipients.split(',').map(email => { return { email: email.trim() }; }),
      // recipients: recipients.split(',').map(email => { email })
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
  
      res.send(user);
    } catch (err) {
      res.status(422).send(err)
    }
  });
};