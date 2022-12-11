const { Schema, model } = require('mongoose')

const DegenSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rugWallet: {
        type: String,
        required: true,
        unique: true
    },
    starWallet: {
        type: String,
        required: true,
        unique: true
    },
    partner: {
        type: this,
        required: false,
    },
    tx: {
        type: String,
        required: false,
    }
})

const Degen = model('degen', DegenSchema)

module.exports = Degen