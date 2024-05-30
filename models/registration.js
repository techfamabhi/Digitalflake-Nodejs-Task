const mongoose = require('mongoose');
const registrationschema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Registration", registrationschema);
