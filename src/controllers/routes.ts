import 'reflect-metadata';
import { Methods } from './decorators/Methods';
import { MetadataKeys } from './decorators/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
} //by extending the PropertyDescriptor with the RouteHandlerInterface (and replacing the typing ) of desc as
//fullfilling the RouteHandlerDescriptor we can assuere that any method the decorator is applied to must be a Route handler

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);

//the PropertyDescriptor argument can be extended by an interface to specify the methods that a decorator can be applied to
