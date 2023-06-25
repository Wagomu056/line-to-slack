const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const token = process.env.TARGET_SLACK_OAUTH;
const channel = process.env.TARGET_SLACK_CHANNEL;

app.listen(3000);
console.log('Server is online.');

app.post('/line-webhook', function(req, res) {
    res.send('Slack send start');

    // Pars from body
    const event = req.body.events[0];
    if (event.type === 'message') {
        const message = event.message;
        if (message.type === 'text') {
            const text = createTextByEvent(message.text, event.timestamp);
            sendToSlack(token, channel, text);
        }
        else {
            let msg = 'その他タイプのメッセージです。[' + message.type + ']';
            const text = createTextByEvent(msg, event.timestamp);
            sendToSlack(token, channel, text);
        }
    }
})

function createTextByEvent(message, timestamp) {
    let text = 'LINEから転送\n';
    text += '-----\n';
    text += message;
    text += '\n-----\n';

    // @todo change format to JST
    //const date = new Date(timestamp);
    //text += date.toString();

    return text;
}

function sendToSlack(oAuthToken, channel, message) {
    const { WebClient } = require('@slack/web-api');
    (async () => {
        const token = process.env.TARGET_SLACK_OAUTH;
        const channel = process.env.TARGET_SLACK_CHANNEL;
        const text = message;

        const client = new WebClient(token);
        const response = await client.chat.postMessage({ channel, text });
    })();
}

