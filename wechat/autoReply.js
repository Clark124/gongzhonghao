var createXML = require('./createXML');

function autoReply(message,ctx) {
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫码进入');
            }
            const xml =  createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'text',
                Content: 'Hello!!'
            });
            ctx.body = xml
        }else if (message.Event === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        }
    }
}

module.exports =  autoReply