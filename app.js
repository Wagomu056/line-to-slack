const express = require('express');

const app = express();

app.listen(3000);
console.log('Server is online.');

app.post('/line-webhook', function(req, res) {
    res.send('Slack send start');

    const { WebClient } = require('@slack/web-api');

    (async () => {
        const token = process.env.TARGET_SLACK_OAUTH;
        const channel = process.env.TARGET_SLACK_CHANNEL;
        const text = '*Hello World*';

        const client = new WebClient(token);
        const response = await client.chat.postMessage({ channel, text });

        console.log(response.ok);
    })();
})

