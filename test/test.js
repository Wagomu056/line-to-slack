const assert = require('assert');
const LineForwarder = require('../libs/line-forwarder');

describe('LineForwarderTests', () => {

    it('get-token', () => {
        const lineForwarder = new LineForwarder('abcdef', '#channel-t');
        assert.equal(lineForwarder.token, 'abcdef');
    });

    it('get-channel', () => {
        const lineForwarder = new LineForwarder('abcdef', '#channel-t');
        assert.equal(lineForwarder.channel, '#channel-t');
    });

});

