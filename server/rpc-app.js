var deepstream = require('deepstream.io-client-js')
const client = deepstream('localhost:6020').login()

let chatListData = client.record.getList('chats');

exports.init = () => {
    client.rpc.provide('addChat', function (data, response) {
        console.log('addChat', data)
        data.id = client.getUid()
        const chatRecord = client.record.getRecord('chat-item/' + data.id)
        chatRecord.set(data)
        chatListData.addEntry(data.id)
        client.event.emit("chat-msg", 'Added chat[' + data + ']');
        response.send('OK');
    });
    client.rpc.provide('removeChat', function (data, response) {
        console.log('removeChat', data)
        const chatRecord = client.record.getRecord('chat-item/' + data)
        chatRecord.whenReady(() => {
            console.log('removeChat', 'READY')
            chatRecord.delete()
            client.event.emit("chat-msg", 'Removed chat[' + data + ']');
            response.send('OK')
        })
    });
    client.rpc.provide('removeEmit', function (data, response) {
        console.log('removeEmit', data)
        client.event.emit("chat-msg", 'Remote Emit');
        response.send('OK')
    });
}