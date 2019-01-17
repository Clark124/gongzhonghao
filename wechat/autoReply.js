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
                Content: '欢迎进入喵喵桃公众号'
            });
            ctx.body = xml
        }else if (message.Event[0] === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        }else if (message.Event[0] === 'LOCATION') {
            const xml =  createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您的地理位置：${message.Latitude[0]},${message.Longitude[0]}`
            });
            ctx.body = xml
        }else if (message.Event[0] === 'CLICK') {
            const xml =  createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您点击了菜单：${message.EventKey[0]}`
            });
            ctx.body = xml
        }else if (message.Event[0] === 'SCAN') {
            // const xml =  createXML({
            //     ToUserName: message.FromUserName[0],
            //     FromUserName: message.ToUserName[0],
            //     MsgType: 'text',
            //     Content: `您点击了菜单：${message.EventKey[0]}`
            // });
            // ctx.body = xml
        }else if (message.Event[0] === 'VIEW') {
            const xml =  createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您点击了菜单中的链接：${message.EventKey[0]}`
            });
            ctx.body = xml
        }
    }else if(message.MsgType[0] === 'text'){
        const content = message.Content[0]
        let reply = '喵了个咪的！！'
        if(content=='1'){
            reply = '心里烦啊'
        }else if(content=='2'){
            reply = '来学前端'
        }
        const xml =  createXML({
            ToUserName: message.FromUserName[0],
            FromUserName: message.ToUserName[0],
            MsgType: 'text',
            Content: reply
        });
        ctx.body = xml
    }
}

module.exports =  autoReply