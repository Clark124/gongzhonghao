var createXML = require('./createXML');

function autoReply(message, wechat) {
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫码进入');
            }
            var now = new Date().getTime();
            return Promise.resolve(createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'text',
                Content: 'Hello!!'
            }));
        }else if (message.Event === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        }
    }
}

module.exports =  autoReply