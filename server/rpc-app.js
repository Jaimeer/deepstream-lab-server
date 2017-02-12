var deepstream = require('deepstream.io-client-js')
const client = deepstream('localhost:6020').login()

let chatListData = client.record.getList('chats');

exports.init = () => {
    client.rpc.provide('addChat', function (data, response) {
        console.log('addChat', data)
        data.id = client.getUid()
        const chatRecord = client.record.getRecord('chat/' + data.id)
        chatRecord.set(data)
        chatListData.addEntry(data.id)
        response.send('OK');
    });
    client.rpc.provide('removeChat', function (data, response) {
        console.log('removeChat', data)
        const chatRecord = client.record.getRecord('chat/' + data)
        chatRecord.whenReady(() => {
            console.log('removeChat', 'READY')
            chatRecord.delete()
            response.send('OK')
        })
    });
}