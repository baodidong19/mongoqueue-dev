import { __awaiter, __generator } from "tslib";
import { connect, connection, model } from 'mongoose';
var Mongo = /** @class */ (function () {
    function Mongo(config) {
        if (config)
            this.setConfig(config);
    }
    Mongo.prototype.setConfig = function (config) {
        var _a;
        Mongo.config = config;
        var databaseURL = config.uris || '';
        var mongooseURL = new URL(databaseURL);
        var logURL = "".concat(mongooseURL.protocol, "//").concat(mongooseURL.host).concat(mongooseURL.pathname);
        if (!Mongo.isInitialize) {
            Mongo.count++;
            console.log('call db: ' + Mongo.count);
            connect(databaseURL, (_a = Mongo.config) === null || _a === void 0 ? void 0 : _a.connectionOptions);
            console.log("Mongoose Connection Established");
            connection.on('open', function () {
                return console.log(logURL, 'MongooseConnected');
            });
            connection.on('reconnected', function () {
                return console.log(logURL, 'MongooseReconnected');
            });
            connection.on('disconnected', function () {
                return console.log(logURL, 'MongooseDisconnected');
            });
            connection.on('close', function () {
                return console.log(logURL, 'MongooseClose');
            });
            connection.on('error', function (err) {
                console.log(err);
            });
        }
        Mongo.isInitialize = true;
        return {
            module: Mongo
        };
    };
    Mongo.prototype.createModel = function (modelName, modelSchema) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, model(Mongo.config.prefix + '-' + modelName, modelSchema)];
            });
        });
    };
    Mongo.isInitialize = false;
    Mongo.count = 0;
    return Mongo;
}());
export { Mongo };
//# sourceMappingURL=mongoqueue_model_mongo.connection.js.map