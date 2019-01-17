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
  const result =  await autoReply(xml.xml)
  ctx.body = result
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
