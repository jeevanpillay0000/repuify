'use strict'

// imports
import * as utils from '../utils'
import { JSONRPC, RPCResult } from './json-rpc'
import { HTTP } from '../utils/simple-http'
import { HTTPPostProcessor } from '../utils/http-processor';

// RPC
export type RPCExecutor = (rpc: JSONRPC, host: string, timeout: number) => Promise<RPCResult>
export const RPCMethodMap = new Map<string, RPCExecutor>()
const debug = require('debug')('thor:http-provider:rpc')

RPCMethodMap.set('eth_getKeyblockByHeight', async function(rpc: JSONRPC, host: string, timeout: number) {
    const URL = host + '/keyblocks/' + utils.fromETHBlockNumber(rpc.params[0])

    const res = await HTTP.get(URL, timeout).then(HTTPPostProcessor)

    return rpc.makeResult(res)
})

RPCMethodMap.set('eth_getKeyblockByHash', async function(rpc: JSONRPC, host: string, timeout: number) {
    const URL = host + '/keyblocks/' + rpc.params[0]

    const res = await HTTP.get(URL, timeout).then(HTTPPostProcessor)

    return rpc.makeResult(res)
})

RPCMethodMap.set('eth_getMicroblockByHash', async function(rpc: JSONRPC, host: string, timeout: number) {
    const URL = host + '/microblocks/' + rpc.params[0]

    const res = await HTTP.get(URL, timeout).then(HTTPPostProcessor)

    return rpc.makeResult(res)
})