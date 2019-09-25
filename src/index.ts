'use strict'

import { extend } from './extend'
import { RepuProvider } from './provider'

const repuify = function(web3Instance: any, host = 'http://localhost:8669', timeout = 0) {
    // Create the provider instance
    const provider = new RepuProvider(host, timeout)

    // Set web3instance to the new provider
    web3Instance.setProvider(provider)

    // Return
    return extend(web3Instance)
}

export { repuify }
