"use strict";
const commandLineArgs = require('command-line-args');
const core_1 = require("../lib/core");
class MessageGenerator extends core_1.NativeClass {
    constructor(_connector) {
        super();
        this._connector = _connector;
        this._interval = 1.0;
    }
}

//# sourceMappingURL=generator.js.map
