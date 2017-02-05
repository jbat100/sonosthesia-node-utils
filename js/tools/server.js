"use strict";
const messaging_1 = require("../lib/messaging");
const commandLineArgs = require('command-line-args');
const connector_1 = require("../lib/connector");
const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if (!options.port)
    options.port = 3333;
const parser = new messaging_1.HubMessageContentParser();
const connector = new connector_1.TCPConnector(parser);
connector.start(options.port).then(() => {
    console.log('Server started on port ' + options.port);
}).catch(err => {
    console.error('Error : ' + err.stack);
});

//# sourceMappingURL=server.js.map
