'use strict'

import { extend } from './extend'
import { ThorProvider } from './provider'

const thorify = function(web3Instance: any, host = 'http://localhost:8669', timeout = 0) {
    const provider = new ThorProvider(host, timeout)
    web3Instance.setProvider(provider)

    // TODO: Add extend methods for the web3Instance, disabled for initial development environment
    // extend(web3Instance)

    return web3Instance
}

export { thorify }
