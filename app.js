const express = require('express');

const app = express();

app.listen(3000);
console.log('Server is online.');

app.post('/', function(req, res) {
    res.send('Slack send start');

    const { WebClient } = require('@slack/web-api');

    (async () => {
        // OAuth トークン
        const token  = 'xoxb-1122712679271-5475292102069-wXQQ0utD7TcuKqD0zJkgp70x';
        // #チャンネル名 of @ユーザー名
        const channel = '#line_to_slack_test';
        // メッセージ
        const text = '*Hello World*';

        const client = new WebClient(token);
        const response = await client.chat.postMessage({ channel, text });

        // 投稿に成功すると `ok` フィールドに `true` が入る。
        console.log(response.ok);
        // => true
    })();
})

