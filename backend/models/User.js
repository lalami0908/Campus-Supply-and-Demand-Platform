const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// type : String ,
// required : true ,
// unique : true
// default :


// Method: 
// authorization
// getName
// 

const UsersSchema = new Schema({
    _id: String, // String

    name: String,
    account: String,
    password: String,
    
    contactInfo: [{
        _id: String,
        phone: String,
        email: String,
    }],
    
    demanderScore: [Number],
    SupplierScore: [Number],
});

const User = mongoose.model('User', UsersSchema);
module.exports = User