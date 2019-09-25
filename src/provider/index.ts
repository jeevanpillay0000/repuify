"use strict";
import { parse } from "url";
import { Callback } from "../types";
import { EventEmitter } from "eventemitter3";
import WebSocket = require("isomorphic-ws");
import { JSONRPC } from "./json-rpc";
import { RPCExecutor, RPCMethodMap } from "./repu-methods";

const debug = require("debug")("repu:http-provider");

interface Sockets {
  [index: number]: {
    rpc: JSONRPC;
    ws: WebSocket;
  };
}

/*
 * This class serves the base class to create a new RepuProvider. It is used with
 * web3 to be able to allow developers to query the RepuCoin blockchain without using
 * explicit Remote Procedural Calls (RPC). It creates an interface on top of the existing
 * web3 instance to allow for RepuCoin's RPC calls.
 *
 * author: jeevan
 * date: 25 September 2019
 */
class RepuProvider extends EventEmitter {
  /* This variable contains the RESTful HOST url, eg: http://localhost:8669 */
  private RESTHost: string;

  /* This variable dictates the timeout duration */
  private timeout: number;

  // TODO: enable subscription service, add ManagerSubscription, instantiate subscription svc
  private WSHost: string;
  private sockets: Sockets;

  constructor(host: string, timeout = 0) {
    super();
    if (!host) {
      throw new Error(
        '[repu-provider]Repuify requires that the host be specified(e.g. "http://localhost:8669")'
      );
    }

    // Parse host
    const hostURL = parse(host);
    if (!hostURL.protocol || !hostURL.host) {
      throw new Error("[repu-provider]Parsing url failed!");
    }

    // Initialize variables
    this.RESTHost = `${hostURL.protocol}//${hostURL.host}`;
    this.timeout = timeout;
  }

  public sendAsync(payload: any, callback: Callback) {
    debug("payload: %O", payload);
    const rpc = new JSONRPC(payload);

    // kindly remind developers about the usage about send transaction
    if (rpc.method === "eth_sendTransaction") {
      return callback(
        null,
        rpc.makeError(
          "[repu-provider]The private key corresponding to from filed can't be found in local eth.accounts.wallet!"
        )
      );
    }

    // Call
    if (RPCMethodMap.has(rpc.method)) {
      // Create the executor
      const executor = RPCMethodMap.get(rpc.method) as RPCExecutor;

      // Execute based on the REST API's
      executor(rpc, this.RESTHost, this.timeout)
        .then(ret => {
          // Return
          debug("response: %O", ret.result);
          omitCallBackedPromise(callback(null, ret));
          return;
        })
        .catch(err => {
          // Catch errors
          omitCallBackedPromise(callback(err, null));
          return;
        });
    } else {
      callback(null, rpc.makeError("[repu-provider]Method not supported!"));
      return;
    }
  }
}

const omitCallBackedPromise = function(callBackedRet: any) {
  /*  when developer calling a method using promise,when error return from provider,the function in web3-core-method
            will return a Promise in,it's ok when writing provider in callback mode but it will cause problems when
            writing provider in Promise, this function is used to omit the rejected promise
        */

  if (callBackedRet && callBackedRet.catch) {
    callBackedRet.catch(() => null);
  }
};

export { RepuProvider };
