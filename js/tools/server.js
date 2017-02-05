"use strict";
const commandLineArgs = require('command-line-args');
const messaging_1 = require("../lib/messaging");
const connector_1 = require("../lib/connector");
const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if (!options.port)
    options.port = 3333;
const parser = new messaging_1.HubMessageContentParser();
const connector = new connector_1.TCPConnector(parser);
const connections = new Map();
const subscriptions = new Map();
connector.emitter.on('connection', (connection) => {
    connections[connection.identifier] = connection;
    subscriptions[connection.identifier] = connection.messageObservable.subscribe((message) => {
        const hubMessage = message;
        console.log('received hub message ' + JSON.stringify(hubMessage.toJSON()));
    });
});
connector.emitter.on('disconnection', (connection) => {
    connections.delete(connection.identifier);
    subscriptions[connection.identifier].dispose();
    subscriptions.delete(connection.identifier);
});
connector.start(options.port).then(() => {
    console.log('Server started on port ' + options.port);
}).catch(err => {
    console.error('Error : ' + err.stack);
});

//# sourceMappingURL=server.js.map
