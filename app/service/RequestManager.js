const request = require('request')

function pushTrayOrders(robotId, deviceId, msg) {
  let url = 'http://127.0.0.1:9050/api/robot/tray/orders'
  let target = '101'
  let orders = []
  let ids = msg.split('|')
  ids.forEach(value => {
    orders.push({
      tableNo: target,
      tableName: target,
      name: '红烧肉，超辣味，周末活动' + value,
      id: value,
      amount: 1.2
    })
  })

  let msgObj = {
    deviceId: deviceId,
    robotId: robotId,
    trayIndex: 0,
    orders: orders
  }

  request({
    method: 'POST',
    url: url,
    headers: {
      'content-type': 'application/json'
    },
    body: msgObj,
    json: true
  }, function(err, httpResponse, body) {

  })
}

module.exports = {
  pushTrayOrders: pushTrayOrders
}