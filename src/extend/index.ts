'use strict'

import { extendAccounts } from './accounts'
import { extendContracts } from './contracts'
import { extendFormatters } from './formatters'
import { extendMethods } from './methods'

const extend = function(web3: any) {
    // TODO: add support for accounts, contracts and formatters
    // Add extra methods
    extendMethods(web3)
}

export {
    extend,
}
