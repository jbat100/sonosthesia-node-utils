"use strict";
const net = require("net");
const _ = require("underscore");
const Q = require("q");
const Rx = require("rx");
const eventemitter3_1 = require("eventemitter3");
const core_1 = require("./core");
const LineInputStream = require('line-input-stream');
class TCPConnector extends core_1.NativeClass {
    constructor() {
        super(...arguments);
        this.jsonDelimiter = '__json_delimiter__';
        this.verbose = true;
        this._connections = [];
        this._emitter = new eventemitter3_1.EventEmitter();
    }
    get server() { return this._server; }
    get error() { return this._error; }
    get emitter() { return this._emitter; }
    start(port) {
        return new Promise((resolve, reject) => {
            if (this.server)
                return reject(new Error('connector is alredy started'));
            console.info(this.tag + ' start on port ' + port);
            this._server = net.createServer((socket) => {
                const connection = new TCPConnection(this, socket);
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
            this.stop();
            throw err;
        });
    }
    stop() {
        return Q().then(() => {
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
class TCPConnection extends core_1.NativeClass {
    constructor(_connector, _socket) {
        super();
        this._connector = _connector;
        this._socket = _socket;
        this._messageSubject = new Rx.Subject();
        this._messageObservable = this._messageSubject.asObservable();
        console.info(this.tag + ' initialize with socket : ' + this.socket.remoteAddress + ':' + this.socket.remotePort);
        this.socket.on('close', () => {
            console.info(this.tag + ' socket closed');
            this.connector.destroyConnection(this);
        });
        this.socket.on('error', (err) => {
            console.error(this.tag + ' socket error' + err.type + ' ' + err.message);
            this.connector.destroyConnection(this);
        });
        this._lineInputStream = LineInputStream(this.socket);
        this._lineInputStream.setEncoding('utf8');
        this._lineInputStream.setDelimiter(this.connector.jsonDelimiter);
        this._lineInputStream.on('line', (line) => {
            if (line && line.length) {
                try {
                    this._messageSubject.onNext(core_1.Message.newFromRaw(line));
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
    get messageObservable() { return this._messageObservable; }
    get socket() { return this._socket; }
    get connector() { return this._connector; }
    sendMessage(message) {
        const str = this.connector.jsonDelimiter + JSON.stringify(message) + this.connector.jsonDelimiter;
        if (this.connector.verbose)
            console.info(this.tag + ' sending : ' + str);
        this.socket.write(str);
    }
}

//# sourceMappingURL=connector.js.map
