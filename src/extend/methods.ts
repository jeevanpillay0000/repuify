'use strict'

const extendMethods = function(web3: any) {
    web3.extend({
        property: 'eth',
        methods: [
            new web3.extend.Method({
                name: 'getKeyblockByHash',
                call: 'eth_getKeyblockByHash',
                params: 1,
                inputFormatter: [null],
                outputFormatter: [null],
            }),
            new web3.extend.Method({
                name: 'getKeyblockByHeight',
                call: 'eth_getKeyblockByHeight',
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
            })
        ],
    });
}

export {
    extendMethods,
}
