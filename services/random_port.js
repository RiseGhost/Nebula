const WebSocket = require('ws')

/*
  Retorna um porta aletórias disponivel no router:
*/

function getPort() {
    try {
      const randomPort = parseInt(Math.random()*10000)
      const ws = new WebSocket.Server({port: 9004})
      ws.close()
      return randomPort
    } catch(err){
      return getPort()
    }
}

module.exports = getPort