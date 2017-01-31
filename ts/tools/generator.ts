/**
 * A script to help producing messages mostly as a test and debug tool for other clients
 */

const commandLineArgs = require('command-line-args');

import {Message, IConnector} from '../lib/core';
import {ControlMessageContent, ComponentMessageContent, } from '../lib/messaging'

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

// enter default options

if (!options.server) options.server = false;
if (!options.target) options.target = 'test';
if (!options.type) options.type = 'control';
if (!options.address) options.address = '127.0.0.1';
if (!options.port) options.port = 3333;
if (!options.interval) options.interval = 1000;
if (!options.count) options.count = 10;

// used in several generations

const step = 1.0 / options.count;

// generators

function* controlGenerator() {
    let i = 0;
    while(i < iterations) {
        //const message = new
        yield i++;
    }
}

async function generate() { await loop(); }

async function loop() {
    // usually stopped with ctrl-c, but safeguards against the program running forever pointlessly
    while (current < iterations) {
        current++;
        await delay(options.interval);
        console.log('ping');
    }
}

function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

generate().then(() => { console.log('done'); }).catch(err => {
    console.log('ended with ' + err);
});