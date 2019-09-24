'use strict'

const extendMethods = function(web3: any) {
    web3.extend({
        property: 'eth',
        methods: [
            new web3.extend.Method({
                name: 'getKeyblock',
                call: 'eth_getKeyblockByHash',
                params: 1,
                inputFormatter: [null],
                outputFormatter: [null],
            }),
            new web3.extend.Method({
                name: 'getTransaction',
                call: 'eth_getTransactionByHash',
                params: 1,
                inputFormatter: [null],
                outputFormatter: web3.extend.formatters.outputTransactionFormatter,
            }),
            new web3.extend.Method({
                name: 'sendTransaction',
                call: 'eth_sendTransaction',
                accounts: web3.eth.accounts,
                params: 1,
                inputFormatter: [web3.extend.formatters.inputTransactionFormatter],
            })
        ],
    });
}

export {
    extendMethods,
}
