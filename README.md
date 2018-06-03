# Email Survey Sender

A React, Redux, Node and Express app for users to buy credits to create surveys (a simple yes or no question).  These surveys can be sent to a mailing list.  If the emailed user clicks yes or no, they will be redirected to a thank you message and the application will be updated with details of what they clicked from the email using a webhook.

## Quick Start Guide

The repository is written in [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [NPM](https://www.npmjs.com/) as the package manager.

I have both the FE and BE in the same repo so you need to run to seperate localhost instances:

**To start the app:**
- make sure you are in the root of the repo
- `npm install`
- To run the server: `npm run start` (by default this starts on [localhost:5000](localhost:5000))
- then `cd` into the `client` folder
- `npm install`
- To run client app: `npm run start` (by default this starts on [localhost:3000](localhost:3000))
- go to `localhost:3000` to view application

## Vision

This app started out as a way to play around with [oAuth 2](https://oauth.net/2/).  The main aim was to understand how to implement oAuth authentication flow from a login page to a page that was only visible once successfully logged in.  I used [Passport.js](http://www.passportjs.org/) to create a Google strategy for logging in.

I then added the functionality for a user to create surveys and display a list of surveys (increasing my knowledge with routing and CRUD flow again).  

I then added a payments system [Stripe](https://stripe.com/gb) so that users could buy credits which could then be used to pay for survey credits.  

I wanted the created survey to be written to an email which could then be sent to a list of users to view.  I used a third part called [SendGrid](https://sendgrid.com/) to do this.

The last step was to display what the email user clicked by using a webhook to update the data on the client end.  All surveys where saved to a Mongo db and when a yes link or no link where clicked on the email a webhook was used to update the survey in the db to change `yes` or `no` to true or false which would then get rendered to the front end

## What I learnt

* How to implememtn oAuth 2 with Passport for Google login
* How to implement an email sender and create templates
* How to implement a payments system and have data rendered on a purchase

* Deeper dive into redux-form and validations
* Full flow of store, action, reducers and routing
* Setting up a Backend (BE) Server app and a Frontend (FE) client app in the same repo, also how to proxy so that BE talks to FE
* Using webhooks to update data from an email click 
* Basic styling with [Materialize Css](https://materializecss.com/)
