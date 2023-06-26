class LineForwarder {
    constructor(slackSender) {
        this.slackSender = slackSender;
    }

    forwardEvent(channel, lineEvent) {
        if (lineEvent.type === 'message') {
            const message = lineEvent.message;
            if (message.type === 'text') {
                const msg = createTextByEvent(message.text);
                this.slackSender.send(channel, msg);
            }
            else {
                let msg = 'その他タイプのメッセージです。[' + message.type + ']';
                msg = createTextByEvent(msg);
                this.slackSender.send(channel, msg);
            }
        }
    }

}

function createTextByEvent(message) {
    let text = 'LINEから転送\n';
    text += '-----\n';
    text += message;
    text += '\n-----\n';

    return text;
}

module.exports = LineForwarder;
