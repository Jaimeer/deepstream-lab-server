const rpcApp = require('./server/rpc-app')
const userConnections = require('./server/userConnections')

rpcApp.init()
userConnections.init()