var createXML = require('./createXML');
var config = require('../config/config')
var Wechat = require('./wechat')
var path = require('path')
var wechatApi = new Wechat(config)
var result = ""

const autoReply = async (message, ctx) => {
    if (message.MsgType[0] === 'event') {
        if (message.Event[0] === 'subscribe') {
            if (message.EventKey[0]) {
                console.log('扫码进入');
            }
            const xml = createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: '欢迎进入喵喵桃公众号'
            });
            ctx.body = xml
        } else if (message.Event[0] === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        } else if (message.Event[0] === 'LOCATION') {
            const xml = createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您的地理位置：${message.Latitude[0]},${message.Longitude[0]}`
            });
            ctx.body = xml
        } else if (message.Event[0] === 'CLICK') {
            const xml = createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您点击了菜单：${message.EventKey[0]}`
            });
            ctx.body = xml
        } else if (message.Event[0] === 'SCAN') {
            // const xml =  createXML({
            //     ToUserName: message.FromUserName[0],
            //     FromUserName: message.ToUserName[0],
            //     MsgType: 'text',
            //     Content: `您点击了菜单：${message.EventKey[0]}`
            // });
            // ctx.body = xml
        } else if (message.Event[0] === 'VIEW') {
            const xml = createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: `您点击了菜单中的链接：${message.EventKey[0]}`
            });
            ctx.body = xml
        }
    } else if (message.MsgType[0] === 'text') {
        const content = message.Content[0]
        if (content == '1') {
            return createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: '心里烦啊'
            });
        } else if (content == '2') {
            return createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: '喵喵宝'
            });
        } else if (content == '3') {
            return createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'news',
                Articles: [{
                    Title: '桃宝宝大笨蛋',
                    Description: "喵喵喵",
                    PicUrl: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1547703696&di=8bbec953e0eae548c42ac642ab4807f8&src=http://n.sinaimg.cn/sinacn/w593h542/20180112/7344-fyqnicm1574844.jpg",
                    Url: "http://www.baidu.com"
                }]
            });
        } else if (content == '4') {
            return await wechatApi.uploadMaterial('image', path.join(__dirname, '../assets/pic_1.jpeg')).then(res => {
                return createXML({
                    ToUserName: message.FromUserName[0],
                    FromUserName: message.ToUserName[0],
                    MsgType: 'image',
                    MediaId: res.media_id
                })
            })
        } else {
            return createXML({
                ToUserName: message.FromUserName[0],
                FromUserName: message.ToUserName[0],
                MsgType: 'text',
                Content: '喵了个咪的'
            });
        }
    }
}

module.exports = autoReply
