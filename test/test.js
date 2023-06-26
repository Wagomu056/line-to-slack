const assert = require('assert');
const LineForwarder = require('../libs/line-forwarder');
const DummySlackSender = require('./dummy-slack-sender');

describe('LineForwarderTests', () => {

    let lineForwarder = null;
    let dummySlackSender = null;

    beforeEach(function(){
        dummySlackSender = new DummySlackSender();
        lineForwarder = new LineForwarder(dummySlackSender);
    });

    it('forward-text', () => {
        let dummyEvent = createDummyTextEvent('Hello');
        lineForwarder.forwardEvent('#ch', dummyEvent);

        assert.equal(dummySlackSender.sendedChannel, '#ch');
        assert.equal(dummySlackSender.sendedMessage,
            'LINEから転送\n-----\nHello\n-----\n');
    });

    it('forward-other', () => {
        let dummyEvent = createDummyOtherEvent();
        lineForwarder.forwardEvent('#ch', dummyEvent);

        assert.equal(dummySlackSender.sendedMessage,
            'LINEから転送\n-----\nその他タイプのメッセージです。[image]\n-----\n');
    });

    it('forward-no-message', () => {
        let dummyEvent = createDummyNoMessage();
        lineForwarder.forwardEvent('#ch', dummyEvent);

        assert.equal(dummySlackSender.sendedMessage,
            '');
    });
});

function createDummyTextEvent(message) {
    let dummyEvent = {type:'message', message:{type:'text', text:message}};
    return dummyEvent;
}

function createDummyOtherEvent() {
    let dummyEvent = {type:'message', message:{type:'image'}};
    return dummyEvent;
}

function createDummyNoMessage() {
    let dummyEvent = {type:'system'};
    return dummyEvent;
}

