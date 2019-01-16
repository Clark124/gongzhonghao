var path = require('path')
const util = require('../util/util')
const wechat_file = path.join(__dirname, './wechat.txt')

const config = {
    appID: "wx20a5345332e70b9e",
    appSecret: "356aa496a191f22439ee827d330dc51f",
    token: "miaolegemide",
    getAccessToken: function () {
        return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function (data) {
        data = JSON.stringify(data)
        return util.writeFileAsync(wechat_file, data)
    }
}

module.exports = config
