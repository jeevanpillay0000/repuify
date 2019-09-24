'use strict'
import { LogQueryBody, LogQueryOptions, LogQueryRange, StringOrNumber, TopicItem, topicName, TopicSet } from '../types'

import * as utils from './'

export const fromETHBlockNumber = function(blockNumber: StringOrNumber): StringOrNumber {
    if (typeof blockNumber === 'number') {
        return blockNumber
    } else if (typeof blockNumber === 'string') {
        if (blockNumber === 'earliest') {
            return 0
        } else if (blockNumber === 'latest' || blockNumber === 'pending') {
            return 'best'
        } else {
            const num = utils.toInteger(blockNumber)
            return num || num === 0 ? num : 'best'
        }
    } else {
        return 'best'
    }
}