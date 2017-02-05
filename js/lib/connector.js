"use strict";
const net = require("net");
const _ = require("underscore");
const Rx = require("rx");
const eventemitter3_1 = require("eventemitter3");
const core_1 = require("./core");
const LineInputStream = require('line-input-stream');
class TCPConnector extends core_1.NativeClass {
    constructor(_parser) {
        super();
        this._parser = _parser;
        this.verbose = true;
        this._connections = [];
        this._emitter = new eventemitter3_1.EventEmitter();
    }
    get server() { return this._server; }
    get error() { return this._error; }
    get emitter() { return this._emitter; }
    get parser() { return this._parser; }
    start(port) {
        return new Promise((resolve, reject) => {
            if (this.server)
                return reject(new Error('connector is already started'));
            console.info(this.tag + ' start on port ' + port);
            this._server = net.createServer((socket) => {
                const connection = new TCPConnection(this, socket, this.parser);
                this._connections.push(connection);
                this.emitter.emit('connection', connection);
            });
            this.server.on('error', (err) => {
                console.error(this.tag + ' server error ' + err.type + ' ' + err.message);
                reject(err);
                this._error = err;
                this.emitter.emit('error', err);
                this.stop();
            });
            this.server.on('close', () => {
                console.error(this.tag + ' server close');
                reject();
                this.stop();
            });
            this.server.on('listening', () => {
                console.info(this.tag + ' server listening on port ' + port);
                resolve();
                this._error = null;
                this.emitter.emit('start');
            });
            this.server.listen(port);
            console.info(this.tag + ' created server listening on port ' + port);
        }).catch((err) => {
            this._error = err;
            console.error(this.tag + ' could not create server on port ', port, err.message);
            this.emitter.emit('error', err);
            this.stop().then(() => {
                throw err;
            });
        });
    }
    stop() {
        return Promise.resolve().then(() => {
            if (this.server) {
                this.server.removeAllListeners();
                this.server.close();
                this._server = null;
                this.emitter.emit('stop');
            }
        });
    }
    destroyConnection(connection) {
        console.warn(this.tag + ' destroying connection!');
        this._connections = _.without(this._connections, connection);
        this.emitter.emit('disconnection', connection);
    }
}
exports.TCPConnector = TCPConnector;
class TCPConnection extends core_1.NativeClass {
    constructor(_connector, _socket, _parser) {
        super();
        this._connector = _connector;
        this._socket = _socket;
        this._parser = _parser;
        this.verbose = true;
        this._messageSubject = new Rx.Subject();
        this._messageObservable = this._messageSubject.asObservable();
        console.info(this.tag + ' initialize with socket : ' + this.socket.remoteAddress + ':' + this.socket.remotePort);
        this.socket.on('close', () => {
            console.info(this.tag + ' socket closed');
            if (this.connector)
                this.connector.destroyConnection(this);
        });
        this.socket.on('error', (err) => {
            console.error(this.tag + ' socket error' + err.type + ' ' + err.message);
            if (this.connector)
                this.connector.destroyConnection(this);
        });
        this._lineInputStream = LineInputStream(this.socket);
        this._lineInputStream.setEncoding('utf8');
        this._lineInputStream.setDelimiter(this.jsonDelimiter);
        this._lineInputStream.on('line', (line) => {
            if (line && line.length) {
                try {
                    const obj = JSON.parse(line);
                    this._messageSubject.onNext(core_1.Message.newFromJSON(obj, this.parser));
                }
                catch (err) {
                    console.error(this.tag + ' json parsing error : ' + err.message);
                }
            }
        });
        this._lineInputStream.on('error', err => {
            console.error(this.tag + ' line input stream error event : ' + err.message);
        });
    }
    get jsonDelimiter() { return '__json_delimiter__'; }
    get messageObservable() { return this._messageObservable; }
    get socket() { return this._socket; }
    get connector() { return this._connector; }
    get parser() { return this._parser; }
    sendJSON(obj) {
        const str = this.jsonDelimiter + JSON.stringify(obj) + this.jsonDelimiter;
        if (this.verbose)
            console.info(this.tag + ' sending : ' + str);
        this.socket.write(str);
    }
    sendMessage(message) {
        this.sendJSON(message.toJSON());
    }
}
exports.TCPConnection = TCPConnection;

//# sourceMappingURL=connector.js.map
