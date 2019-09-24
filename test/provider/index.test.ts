'use strict'
import { expect } from 'chai'
import { RepuProvider } from '../../src/provider'

describe('thor-provider initialization', () => {

    it('should throw error if called without empty host', () => {
        expect(() => { const provider = new RepuProvider(''); return provider }).to.throw('[thor-provider]Thorify requires that the host be specified(e.g. "http://localhost:8669")')
    })

    it('should parse url', () => {
        const provider = new RepuProvider('http://localhost:8669')
        expect(provider).to.have.property('RESTHost', 'http://localhost:8669')
    })

    it('should parse url with https', () => {
        const provider = new RepuProvider('https://localhost:8669')
        expect(provider).to.have.property('RESTHost', 'https://localhost:8669')
    })

    it('should throw error with wrong', () => {
        expect(() => {
            return new RepuProvider('invalidurl')
        }).to.throw('[thor-provider]Parsing url failed!')
    })

})

describe('thor-provider methods', () => {

    it('not supported method should return error ', (done) => {
        const provider = new RepuProvider('http://localhost:8669')
        provider.sendAsync({
            method: 'not supported method',
        }, (err, ret) => {
            if (err) {
                done(new Error('Return error in wrong place!'))
            }
            if (ret.error) {
                expect(ret.error.message).to.be.equal('[thor-provider]Method not supported!')
                done()
            } else {
                done(new Error('No error thrown!'))
            }
        })
    })

    it('eth_sendTransaction method should throw error', (done) => {
        const provider = new RepuProvider('http://localhost:8669')
        provider.sendAsync({
            method: 'eth_sendTransaction',
        }, (err, ret) => {
            if (err) {
                done(new Error('Return error in wrong place!'))
            }
            if (ret.error) {
                expect(ret.error.message).to.be.equal('[thor-provider]The private key corresponding to from filed can\'t be found in local eth.accounts.wallet!')
                done()
            } else {
                done(new Error('No error thrown!'))
            }
        })
    })

});