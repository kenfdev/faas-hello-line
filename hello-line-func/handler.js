"use strict"

var request = require('request');

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

module.exports = (context, callback) => {
    const json = JSON.parse(context);
    callback(undefined, {status: 'done'});

    json
        .events
        .forEach(({type, message, replyToken}) => {
            if (type != 'message' || message.text != 'ハロー') {
                return;
            }
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
            };
            var body = {
                replyToken,
                messages: [
                    {
                        type: 'text',
                        text: 'こんにちは'
                    }
                ]
            };
            var url = 'https://api.line.me/v2/bot/message/reply';
            request({url, method: 'POST', headers, body, json: true});
        });
}
