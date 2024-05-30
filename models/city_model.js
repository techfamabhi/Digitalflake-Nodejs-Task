const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("City", cityschema);
