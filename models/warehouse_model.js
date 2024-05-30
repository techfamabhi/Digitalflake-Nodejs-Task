const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
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

module.exports = mongoose.model("warehouse", warehouseschema);
