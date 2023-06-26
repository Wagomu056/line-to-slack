
class DummySlackSender {
    constructor() {
        this.sendedChannel = '';
        this.sendedMessage = '';
    }

    send(ch, msg) {
        this.sendedChannel = ch;
        this.sendedMessage = msg;
    }
}

module.exports = DummySlackSender;
