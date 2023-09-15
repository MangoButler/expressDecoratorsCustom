"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.patch = exports.del = exports.post = exports.get = void 0;
require("reflect-metadata");
const Methods_1 = require("./decorators/Methods");
const MetadataKeys_1 = require("./decorators/MetadataKeys");
//fullfilling the RouteHandlerDescriptor we can assuere that any method the decorator is applied to must be a Route handler
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.put = routeBinder(Methods_1.Methods.put);
//the PropertyDescriptor argument can be extended by an interface to specify the methods that a decorator can be applied to