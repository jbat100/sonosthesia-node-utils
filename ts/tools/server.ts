

import {HubMessageContentParser} from "../lib/messaging";
const commandLineArgs = require('command-line-args');

import {TCPConnector} from '../lib/connector';

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number }
];

const options = commandLineArgs(optionDefinitions);

// enter default options

if (!options.port) options.port = 3333;

const parser = new HubMessageContentParser();
const connector = new TCPConnector(parser);

connector.start(options.port).then(() => {
    console.log('Server started on port ' + options.port);
}).catch(err => {
    console.error('Error : ' + err.stack);
});