/**
 * A script to help producing messages mostly as a test and debug tool for other clients
 */

const commandLineArgs = require('command-line-args');

import {NativeClass, IConnector} from '../lib/core';

class MessageGenerator extends NativeClass {

    private _interval : number = 1.0;

    private

    constructor(private _connector : IConnector) {
        super();
    }


}