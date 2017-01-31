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
const iterations = 1000000;
let current = 0;
const optionDefinitions = [
    { name: 'server', alias: 's', type: Boolean },
    { name: 'target', alias: 't', type: String },
    { name: 'type', alias: 'm', type: String },
    { name: 'address', alias: 'a', type: String },
    { name: 'port', alias: 'p', type: Number },
    { name: 'interval', alias: 'i', type: Number },
    { name: 'count', alias: 'c', type: Number }
];
const options = commandLineArgs(optionDefinitions);
if (!options.server)
    options.server = false;
if (!options.target)
    options.target = 'test';
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
const step = 1.0 / options.count;
function* controlGenerator() {
    let i = 0;
    while (i < iterations) {
        yield i++;
    }
}
function generate() {
    return __awaiter(this, void 0, void 0, function* () { yield loop(); });
}
function loop() {
    return __awaiter(this, void 0, void 0, function* () {
        while (current < iterations) {
            current++;
            yield delay(options.interval);
            console.log('ping');
        }
    });
}
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
generate().then(() => { console.log('done'); }).catch(err => {
    console.log('ended with ' + err);
});

//# sourceMappingURL=generator.js.map
