import { getStore } from './tools/dva'
import _ from 'lodash'
const JSEncrypt = require('jsencrypt')

const publicKey = _.get(getStore().getState(), 'base.publicKey')
const encrypt = new JSEncrypt.JSEncrypt()
encrypt.setPublicKey(publicKey)

export default function encryptPassword (password) {
    return encrypt.encrypt(password)
}