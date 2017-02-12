var Deepstream = require('deepstream.io'),
    // PostgresConnector = require('deepstream.io-storage-postgres'),
    MongoDBStorageConnector = require('deepstream.io-storage-mongodb'),
    RedisCacheConnector = require('deepstream.io-cache-redis'),
    RedisMessageConnector = require('deepstream.io-msg-redis'),
    server = new Deepstream();
    
server.set('storage', new MongoDBStorageConnector({
    connectionString: 'mongodb://localhost:32772/testdb',
    splitChar: '/'
}));

/*
server.set('cache', new RedisCacheConnector({
    port: 32771,
    host: 'localhost'
}));
*/

/*
server.set('messageConnector', new RedisMessageConnector({
    port: 32771,
    host: 'localhost'
}));
*/

server.start();