'use strict'

// imports
import * as utils from '../utils'
import { JSONRPC, RPCResult } from './json-rpc'
import { HTTP } from '../utils/simple-http'
import { HTTPPostProcessor } from '../utils/http-processor';

// debug
const debug = require('debug')('repu:http-provider:rpc')

// RPC
export type RPCExecutor = (rpc: JSONRPC, host: string, timeout: number) => Promise<RPCResult>
export const RPCMethodMap = new Map<string, RPCExecutor>()
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

RPCMethodMap.set('eth_getTransactionByHash', async function(rpc: JSONRPC, host: string, timeout: number) {
    const URL = host + '/transactions/' + rpc.params[0]

    const res = await HTTP.get(URL, timeout).then(HTTPPostProcessor)

    if (!res) {
        return rpc.makeResult(null)
    }

    // TODO: link to microblock
    // res.microblockHash = res.meta.microblockHash
    return rpc.makeResult(res)
})