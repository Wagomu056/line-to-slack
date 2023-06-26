
const { WebClient } = require('@slack/web-api');

class SlackSender {
    constructor(token) {
        this.client = new WebClient(token);
    }

    send(ch, msg) {
        (async () => {
            const channel = ch;
            const text = msg;
            const response = await this.client.chat.postMessage({ channel, text });
        })();
    }
}

module.exports = SlackSender;
