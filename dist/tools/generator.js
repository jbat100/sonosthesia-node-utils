"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const commandLineArgs = require('command-line-args');
const net_1 = require("net");
const _ = require("underscore");
const core_1 = require("../lib/core");
const connector_1 = require("../lib/connector");
const messaging_1 = require("../lib/messaging");
const messaging_2 = require("../lib/messaging");
const messaging_3 = require("../lib/messaging");
const iterations = 1000000;
let current = 0;
const optionDefinitions = [
    { name: 'type', alias: 't', type: String },
    { name: 'address', alias: 'a', type: String },
    { name: 'port', alias: 'p', type: Number },
    { name: 'interval', alias: 'i', type: Number },
    { name: 'count', alias: 'c', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if (!options.type)
    options.type = 'control';
if (!options.address)
    options.address = '127.0.0.1';
if (!options.port)
    options.port = 3333;
if (!options.interval)
    options.interval = 1000;
if (!options.count)
    options.count = 10;
const range = 1.0;
const step = range / options.count;
const component = 'test-component';
const channel = 'test-channel';
const parameter = 'test-parameter';
const key = 'test-key';
function* controlGenerator() {
    let i = 0;
    let val = 0.0;
    while (i < iterations) {
        val = val + step;
        if (val > 1.0)
            val = 0.0;
        const parameters = messaging_3.Parameters.newFromJSON({ parameter: val });
        const content = new messaging_1.ControlMessageContent(component, channel, null, null, parameters);
        const message = new messaging_3.HubMessage(messaging_3.HubMessageType.Control, null, content);
        i++;
        yield message;
    }
}
function* actionGenerator() {
    let i = 0;
    while (i < iterations) {
        i++;
        const content = new messaging_1.ActionMessageContent(component, channel, null, key, null);
        const message = new messaging_3.HubMessage(messaging_3.HubMessageType.Action, null, content);
        yield message;
    }
}
function* instanceGenerator() {
    let i = 0, content, message;
    while (i < iterations) {
        i++;
        const instance = core_1.GUID.generate();
        content = new messaging_2.CreateMessageContent(component, channel, instance, null, null);
        message = new messaging_3.HubMessage(messaging_3.HubMessageType.Create, null, content);
        yield message;
        content = new messaging_1.ActionMessageContent(component, channel, instance, key, null);
        message = new messaging_3.HubMessage(messaging_3.HubMessageType.Action, null, content);
        yield message;
        const parameters = messaging_3.Parameters.newFromJSON({ parameter: 0.5 });
        content = new messaging_1.ControlMessageContent(component, channel, instance, null, parameters);
        message = new messaging_3.HubMessage(messaging_3.HubMessageType.Control, null, content);
        yield message;
        content = new messaging_2.DestroyMessageContent(component, channel, instance, null, null);
        message = new messaging_3.HubMessage(messaging_3.HubMessageType.Destroy, null, content);
        yield message;
    }
}
function generate(connection, generator) {
    return __awaiter(this, void 0, void 0, function* () {
        while (current < iterations) {
            current++;
            yield delay(options.interval);
            const obj = generator.next();
            connection.sendMessage(obj.value);
            if (obj.done)
                break;
        }
    });
}
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
const generators = {
    'control': controlGenerator,
    'action': actionGenerator,
    'instance': instanceGenerator
};
if (!_.has(generators, options.type)) {
    throw new Error('unsuported generator type : ' + options.type);
}
const client = new net_1.Socket();
const parser = new messaging_1.HubMessageContentParser();
const generator = generators[options.type]();
client.connect(options.port, options.address, () => {
    console.log('Connected');
    const connection = new connector_1.TCPConnection(null, client, parser);
    generate(connection, generator).then(() => { console.log('done'); }).catch(err => {
        console.log('Ended with error ' + err.stack);
    });
});

//# sourceMappingURL=generator.js.map
