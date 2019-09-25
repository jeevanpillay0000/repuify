'use strict'
import { expect } from 'chai'
import { web3, wsUtility, xhrUtility } from '../test-utils/init'


describe('web3.eth', () => {
    beforeEach(() => {
        xhrUtility.resetMockData()
        xhrUtility.clearCachedResponse()
    });

    it('getBlock without parameter', async () => {
        await web3.eth.getBlock()

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/best')
    })

    it('getBlock with earliest', async () => {
        await web3.eth.getBlock('earliest')

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/0')
    })

    it('getBlock with latest', async () => {
        await web3.eth.getBlock('latest')

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/best')
    })

    it('getBlock with pending', async () => {
        await web3.eth.getBlock('pending')

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/best')
    })

    it('getBlock with blockHash', async () => {
        web3.eth.getBlock('0x00003800dfbcc35f2010ebcc26f28f009268b1df58886a0c698545ed07bd1c7b')

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/0x00003800dfbcc35f2010ebcc26f28f009268b1df58886a0c698545ed07bd1c7b')
    })

    it('getBlock with blockNumber', async () => {
        await web3.eth.getBlock(1)

        const { url } = xhrUtility.extractRequest()
        expect(url).to.be.equal('/blocks/1')
    })

    it('getBlock with normal response', async () => {
        xhrUtility.setResponse({
            number: 634569,
            id: '0x0009aec90d88f6cae1c228f8b081ca21712768cd237d7593f19e35d7d6cff0ab',
            size: 240,
            parentID: '0x0009aec816e6c38e41f4dc9b41001412d0a6d7bffb193d122cb281a8e73979e1',
            timestamp: 1536664770,
            gasLimit: 15752702,
            beneficiary: '0x54f6f89138b7ff8131fa76485d1a81cc1e8fe2b7',
            gasUsed: 0,
            totalScore: 62654805,
            txsRoot: '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            stateRoot: '0x218a10dabd1794b29bb164d009353aff9bed8a6b640664214174aba078a40df4',
            receiptsRoot: '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            signer: '0xc3b3770ecabd9410f70b27612da8242eddd70dcf',
            isTrunk: true,
            transactions: [],
        })
        const result = await web3.eth.getBlock('latest')
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/blocks/best')
        expect(result).to.have.all.keys('number', 'id', 'size', 'parentID', 'timestamp', 'gasLimit', 'beneficiary', 'gasUsed', 'totalScore', 'txsRoot', 'stateRoot', 'receiptsRoot', 'signer', 'isTrunk', 'transactions')
    })

    it('getBlockNumber with valid response', async () => {
        xhrUtility.setResponse({
            number: 634569,
        })
        const result = await web3.eth.getBlockNumber()
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/blocks/best')
        expect(result).to.be.equal(634569)
    })

    it('getBalance with valid response', async () => {
        xhrUtility.setResponse({
            balance: '0x47ff1f90327aa0f8e',
        })
        const result = await web3.eth.getBalance('0xe59d475abe695c7f67a8a2321f33a856b0b4c71d')
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/accounts/0xe59d475abe695c7f67a8a2321f33a856b0b4c71d?revision=best')
        expect(result).to.be.equal('83006399998987997070')
    })

    it('getStorageAt with valid response', async () => {
        xhrUtility.setResponse({
            value: '0x0000000000000000000000000000000000000000000000000000000000000001',
        })
        const result = await web3.eth.getStorageAt('0xe59d475abe695c7f67a8a2321f33a856b0b4c71d', '0x00003800dfbcc35f2010ebcc26f28f009268b1df58886a0c698545ed07bd1c7b')
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/accounts/0xe59d475abe695c7f67a8a2321f33a856b0b4c71d/storage/0x00003800dfbcc35f2010ebcc26f28f009268b1df58886a0c698545ed07bd1c7b?revision=best')
        expect(result).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001')
    })

    it('getCode with valid response', async () => {
        xhrUtility.setResponse({
            code: '0x6060604052600080fd00a165627a7a72305820c23d3ae2dc86ad130561a2829d87c7cb8435365492bd1548eb7e7fc0f3632be90029',
        })
        const result = await web3.eth.getCode('0xe59d475abe695c7f67a8a2321f33a856b0b4c71d')
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/accounts/0xe59d475abe695c7f67a8a2321f33a856b0b4c71d/code?revision=best')
        expect(result).to.be.equal('0x6060604052600080fd00a165627a7a72305820c23d3ae2dc86ad130561a2829d87c7cb8435365492bd1548eb7e7fc0f3632be90029')
    })

    it('getBlock with valid response', async () => {
        xhrUtility.setResponse({
            number: 1,
            id: '0x000000015284865a9a43ac140a7c3fc56d24251c54e4b041abd22b8a6bfcaf32',
            size: 236,
            parentID: '0x000000003a3e7437634e9ab026cd279a88a8f086c2f332421d424668ac976bc7',
            timestamp: 1536746151,
            gasLimit: 10000000,
            beneficiary: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            gasUsed: 0,
            totalScore: 1,
            txsRoot: '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            stateRoot: '0xaed7d0fab0bc7c920f7e74c5eb8c1919129130c323ffa52182574ff196b89901',
            receiptsRoot: '0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0',
            signer: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            isTrunk: true,
            transactions: [],
        })
        const result = await web3.eth.getBlock(1)
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/blocks/1')
        expect(result).to.be.have.all.keys('number', 'id', 'size', 'parentID', 'timestamp', 'gasLimit', 'beneficiary', 'gasUsed', 'totalScore', 'txsRoot', 'stateRoot', 'receiptsRoot', 'signer', 'isTrunk', 'transactions')
    })

    it('getTransactionReceipt with valid response', async () => {
        xhrUtility.setResponse({
            gasUsed: 36198,
            gasPayer: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            paid: '0x2f281da8bce34d8ce',
            reward: '0xe25a27f6bddca771',
            reverted: false,
            meta: {
                blockID: '0x000001136820faf9fefc4feab2a83ceb4d5141a52e19b857e3cb91a7e51776c4',
                blockNumber: 275,
                blockTimestamp: 1536748891,
                txID: '0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41',
                txOrigin: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            },
            outputs: [
                {
                    contractAddress: null,
                    events: [
                        {
                            address: '0x0000000000000000000000000000456e65726779',
                            topics: [
                                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                                '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
                                '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
                            ],
                            data: '0x0000000000000000000000000000000000000000000000000000000000000001',
                        },
                    ],
                    transfers: [],
                },
            ],
        })
        const result = await web3.eth.getTransactionReceipt('0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41')
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/transactions/0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41/receipt')
        expect(result).to.be.have.all.keys('blockHash', 'blockNumber', 'contractAddress', 'status', 'transactionHash', 'gasUsed', 'gasPayer', 'paid', 'reward', 'reverted', 'meta', 'outputs', 'cumulativeGasUsed', 'transactionIndex')
        expect(result.outputs).to.have.length(1)
        expect(result.outputs[0].events[0].topics).to.have.length(3)
        expect(result.blockHash === result.meta.blockID).to.be.equal(true)
        expect(result.blockNumber === result.meta.blockNumber).to.be.equal(true)
        expect(result.transactionHash === result.meta.txID).to.be.equal(true)
        expect(result.contractAddress === result.outputs[0].contractAddress).to.be.equal(true)
        // expect(result.status).to.be.equal('0x1')
    })

    it('sendTransaction with valid response', (done) => {
        web3.eth.sendTransaction({from: 0}).then(() => {
            done(new Error('no error thrown'))
        }).catch((e) => {
            try {
                expect(() => { throw e || 'no error' }).to.throw('[thor-provider]The private key corresponding to from filed can\'t be found in local eth.accounts.wallet!')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    it('sendSignedTransaction with valid response', (done) => {
        xhrUtility.setCachedResponse('/transactions', { id: '0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41' })
        xhrUtility.setCachedResponse('/transactions/0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41/receipt', {
            gasUsed: 36198,
            transactionIndex: 1,
            gasPayer: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            cumulativeGasUsed: 300000,
            paid: '0x2f281da8bce34d8ce',
            reward: '0xe25a27f6bddca771',
            reverted: false,
            meta: {
                blockID: '0x000001136820faf9fefc4feab2a83ceb4d5141a52e19b857e3cb91a7e51776c4',
                blockNumber: 275,
                blockTimestamp: 1536748891,
                txID: '0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41',
                txOrigin: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            },
            outputs: [
                {
                    contractAddress: null,
                    events: [
                        {
                            address: '0x0000000000000000000000000000456e65726779',
                            topics: [
                                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                                '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
                                '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed',
                            ],
                            data: '0x0000000000000000000000000000000000000000000000000000000000000001',
                        },
                    ],
                    transfers: [],
                },
            ],
        })
        setTimeout(() => {
            wsUtility.emitData({})
        }, 50)

        setTimeout(() => {
            wsUtility.resetMockData()
            done();
        }, 100)

        web3.eth.sendSignedTransaction('0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400').then((result) => {
            try {
                const { url } = xhrUtility.extractRequest()

                expect(url).to.be.equal('/transactions/0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41/receipt')
                expect(result).to.be.have.all.keys('blockHash', 'blockNumber', 'contractAddress', 'status', 'transactionHash', 'gasUsed', 'gasPayer', 'paid', 'reward', 'reverted', 'meta', 'outputs', 'transactionIndex', 'cumulativeGasUsed')
                expect(result.outputs).to.have.length(1)
                expect(result.outputs[0].events[0].topics).to.have.length(3)
                expect(result.blockHash === result.meta.blockID).to.be.equal(true)
                expect(result.blockNumber === result.meta.blockNumber).to.be.equal(true)
                expect(result.transactionHash === result.meta.txID).to.be.equal(true)
                expect(result.contractAddress === result.outputs[0].contractAddress).to.be.equal(true)
                // expect(result.status).to.be.equal('0x1')
            } catch (err) {
                
            }
        })

    })

    it('sendSignedTransaction with valid response', (done) => {
        xhrUtility.setCachedResponse('/transactions', { id: '0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41' })
        xhrUtility.setCachedResponse('/transactions/0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41/receipt', {
            gasUsed: 36198,
            reverted: false,
            meta: {
                blockID: '0x000001136820faf9fefc4feab2a83ceb4d5141a52e19b857e3cb91a7e51776c4',
                blockNumber: 275,
                txID: '0xa3c7ad107664e1b2ca089deb3d1b0fe69706abcfda12e375acb8e02dfa61fa41',
            },
            outputs: [],
        })
        web3.eth.sendSignedTransaction('0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400')

        const { url, body } = xhrUtility.extractRequest()
        
        // make sure emitData execute after extractRequest(after newBlockHead emit data, web3-core-method will call get transaction receipt, fake-xhr2 will be the request data of getTransactionReceipt)
        setTimeout(() => {
            wsUtility.emitData({})
        }, 50)

        setTimeout(() => {
            wsUtility.resetMockData()
        }, 100)

        expect(body).to.have.property('raw', '0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400')
        expect(url).to.be.equal('/transactions')
        done();

    })

    it('call with valid response', async () => {
        xhrUtility.setResponse({
            data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        })
        const result = await web3.eth.call({
            from: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            to: '0x0000000000000000000000000000456e65726779',
            data: '0xa9059cbb000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff6020000000000000000000000000000000000000000000000000000000000000064',
        })
        const { url, body } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/accounts/0x0000000000000000000000000000456e65726779?revision=best')
        expect(result).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001')
        expect(body).to.have.property('caller', '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed')
        expect(body).to.have.property('data', '0xa9059cbb000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff6020000000000000000000000000000000000000000000000000000000000000064')
    })

    it('estimateGas with valid response', async () => {
        xhrUtility.setResponse({
            gasUsed: 0,
        })
        const result = await web3.eth.estimateGas({
            from: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            to: '0x0000000000000000000000000000456e65726779',
            value: '0x64',
            gas: 21000,
        })
        const { url, body } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/accounts/0x0000000000000000000000000000456e65726779?revision=best')
        expect(result).to.be.equal(21000)
        expect(body).to.have.property('caller', '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed')
        expect(body).to.have.property('value', '0x64')
    })

    it('getPastLogs with valid response', async () => {
        xhrUtility.setResponse([{
            address: '0x0000000000000000000000000000456e65726779',
            topics:
                ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    '0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602',
                    '0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed'],
            data: '0x0000000000000000000000000000000000000000000000000000000000000001',
            meta:
            {
                blockID: '0x0000005b0f386bdd9b677993f52a1a3c76445df49781d9c111a70ecacff63169',
                blockNumber: 91,
                blockTimestamp: 1536747051,
                txID: '0x405611a6ba2f9a5f45b81a899f2c15f87c7938dcc01589a9f2981c7609dc153a',
                txOrigin: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
            },
            blockNumber: 91,
            blockHash: '0x0000005b0f386bdd9b677993f52a1a3c76445df49781d9c111a70ecacff63169',
            transactionHash: '0x405611a6ba2f9a5f45b81a899f2c15f87c7938dcc01589a9f2981c7609dc153a',
        }])
        const result = await web3.eth.getPastLogs({
            address: '0x0000000000000000000000000000456e65726779',
            topics: ['0x0000000000000000000000000000456e65726779[0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        })
        const { url } = xhrUtility.extractRequest()

        expect(url).to.be.equal('/logs/events?address=0x0000000000000000000000000000456e65726779')
        expect(result.length).to.be.equal(1)
    })
})

describe('web3.eth:error handling', () => {
    beforeEach(() => {
        xhrUtility.resetMockData()
        xhrUtility.clearCachedResponse()
    })

    it('execute method with response code 0(means server is not responding) throw error', (done) => {
        xhrUtility.setResponse(null, 0)

        web3.eth.getBlock(1).then(() => {
            done(new Error('no error thrown'))
        }).catch((e) => {
            try {
                expect(() => { throw e || 'no error' }).to.throw('[thor-provider] Invalid response, check the host')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    it('execute method with invalid response code and no response body should throw error', (done) => {
        xhrUtility.setResponse(null, 500)

        web3.eth.getBlock(1).then(() => {
            done(new Error('no error thrown'))
        }).catch((e) => {
            try {
                expect(() => { throw e || 'no error' }).to.throw('[thor-provider] Invalid response code from provider: 500')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    it('sendRawTransaction with wrong signature should throw error', (done) => {
        // this code is for testing omitCallBackedPromise in provider/index.ts
        xhrUtility.setResponse('bad tx: recovery failed', 400)
        web3.eth.sendSignedTransaction('0xf8be4a').then(() => {
            done(new Error('no error thrown'))
        }).catch((e) => {
            try {
                expect(() => { throw e || 'no error' }).to.throw('bad tx: recovery failed')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

})
