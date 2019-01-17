var createXML = require('./createXML');

function autoReply(message,ctx) {
    console.log(message)
    if (message.MsgType[0] === 'event') {
        if (message.Event[0] === 'subscribe') {
            if (message.EventKey[0]) {
                console.log('扫码进入');
            }
            const xml =  createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: 'Hello!!'
            });
            ctx.body = xml
        }else if (message.Event[0] === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        }
    }
}

module.exports =  autoReply
