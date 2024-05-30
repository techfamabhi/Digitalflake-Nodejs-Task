const mongoose = require('mongoose');
const stateschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("state", stateschema);
