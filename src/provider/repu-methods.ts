'use strict'

import * as utils from '../utils'
import { JSONRPC, RPCResult } from './json-rpc'
import { HTTP, SimpleResponse } from './simple-http'
const debug = require('debug')('thor:http-provider:rpc')

export type RPCExecutor = (rpc: JSONRPC, host: string, timeout: number) => Promise<RPCResult>

export const RPCMethodMap = new Map<string, RPCExecutor>()

const HTTPPostProcessor = function(res: SimpleResponse): Promise<any> {
    if (res.Code === 0) {
        return Promise.reject(new Error(`[thor-provider] Invalid response, check the host`))
    }
    if (res.Code !== 200) {
        return Promise.reject(new Error(res.Body ? res.Body as string : ('[thor-provider] Invalid response code from provider: ' + res.Code) ))
    }
    return Promise.resolve(res.Body)
}

RPCMethodMap.set('eth_getKeyblockByHash', async function(rpc: JSONRPC, host: string, timeout: number) {
    const URL = host + '/keyblocks/' + rpc.params[0]

    const res = await HTTP.get(URL, timeout).then(HTTPPostProcessor)

    return rpc.makeResult(res)
})