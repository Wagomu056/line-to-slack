const express = require('express');
const bodyParser = require('body-parser');
const LineForwarder = require('./libs/line-forwarder.js');
const SlackSender = require('./libs/slack-sender.js');

const TOKEN = process.env.TARGET_SLACK_OAUTH;
const CHANNEL = process.env.TARGET_SLACK_CHANNEL;

const slackSender = new SlackSender(TOKEN);
const lineForwarder = new LineForwarder(slackSender);

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server is online.');

app.post('/line-webhook', function(req, res) {
    res.send('Slack send start');

    const event = req.body.events[0];
    lineForwarder.forwardEvent(CHANNEL, event);
})

