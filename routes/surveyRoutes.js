const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');



module.exports = (app) => {

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting');
  });

  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path('/api/surveys/:surveyId/:choice');

     _.chain(req.body)
      .map((event) => {

        const match = p.test(new URL(event.url).pathname);

        if(match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }

      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(event => {        
        Survey.findOneAndUpdate({
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        }, {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({});
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {

    const user = req.user.id;

    const surveys = await Survey.find({_user: user}).select({ recipients: false });

    res.send(surveys);
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