const router = require('koa-router')()
const sha1 = require('sha1')
const config = require('../config/config')
const autoReply = require('../wechat/autoReply')

router.get('/', async (ctx, next) => {
  const token = config.token
  const { signature, nonce, timestamp, echostr } = ctx.query
  var str = [token, timestamp, nonce].sort().join("")
  var sha = sha1(str)
  if (sha === signature) {
    ctx.body = echostr
  } else {
    ctx.body = 'wrong'
  }
})

router.post('/', async (ctx, next) => {
  const xml = ctx.request.body;
  // console.log(xml)
  autoReply(xml.xml, ctx)
  // const msgType = xml.xml.MsgType[0];
  // const toUserName = xml.xml.ToUserName[0];
  // const toFromName = xml.xml.FromUserName[0];
  // const event = xml.xml.Event ? xml.xml.Event[0] : '';
  // const content = xml.xml.Content ? xml.xml.Content[0] : '';
  // const createTime = new Date().getTime();
  // if (msgType == 'event' && event == 'subscribe') { //关注后
  //   ctx.body = `<xml>
  // 	 <ToUserName><![CDATA[${toFromName}]]></ToUserName>
  // 	 <FromUserName><![CDATA[${toUserName}]]></FromUserName>
  // 	 <CreateTime>${createTime}</CreateTime>
  // 	 <MsgType><![CDATA[text]]></MsgType>
  // 	 <Content><![CDATA[欢迎关注桃宝宝公众号，下面请开始你的表演！]]></Content>
  // 	 </xml>`;
  // } else if (msgType === 'text' && content === '喵喵桃') {
  //   ctx.body = `<xml>
  //   <ToUserName><![CDATA[${toFromName}]]></ToUserName>
  //   <FromUserName><![CDATA[${toUserName}]]></FromUserName>
  //   <CreateTime>${createTime}</CreateTime>
  //   <MsgType><![CDATA[text]]></MsgType>
  //   <Content><![CDATA[喵了个咪的]]></Content>
  //   </xml>`;

  // } else {//其他情况
  //   ctx.body = `<xml>
  // 	 <ToUserName><![CDATA[${toFromName}]]></ToUserName>
  // 	 <FromUserName><![CDATA[${toUserName}]]></FromUserName>
  // 	 <CreateTime>${createTime}</CreateTime>
  // 	 <MsgType><![CDATA[text]]></MsgType>
  // 	 <Content><![CDATA[啊~啊~啊~你在发什么消息？]]></Content>
  // 	 </xml>`;
  // }
});


// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
