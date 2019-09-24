'use strict'

import { extend } from './extend'
import { ThorProvider } from './provider'

const thorify = function(web3Instance: any, host = 'http://localhost:8669', timeout = 0) {
    // Create the provider instance
    const provider = new ThorProvider(host, timeout)

    // Set web3instance to the new provider
    web3Instance.setProvider(provider)

    extend(web3Instance)
    return web3Instance
}

export { thorify }
