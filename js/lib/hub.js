"use strict";
const Q = require("q");
const core_1 = require("./core");
const messaging_1 = require("./messaging");
const component_1 = require("./component");
class HubManager extends core_1.NativeClass {
    constructor(_configuration, _connector) {
        super();
        this._configuration = _configuration;
        this._connector = _connector;
        this._messageContentParser = new messaging_1.HubMessageContentParser();
        this._componentManager = new component_1.ComponentManager();
    }
    get configuration() { return this._configuration; }
    get componentManager() { return this._componentManager; }
    get connector() { return this._connector; }
    setup() {
        return Q(null).then(() => {
        });
    }
    teardown() {
        return Q(null).then(() => {
            console.log("booo");
        });
    }
    setupConnection(connection) {
        connection.messageObservable.subscribe((message) => {
            message.parse(this._messageContentParser);
        });
    }
}
exports.HubManager = HubManager;

//# sourceMappingURL=hub.js.map
