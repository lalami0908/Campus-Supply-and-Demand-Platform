const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-jwt-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-2e64d72594f8


// const crypto = require('crypto');
// const bcrypt = require('bcrypt');


// type : String ,
// required : true ,
// unique : true
// default :


// Method: 
// authorization
// getName
// 

const UsersSchema = new Schema({
    // _id: String, // String

    name: String,
    NTUID: String,
    password: String,

    hash: String,
    salt: String,
    
    contactInfo: [{
        _id: String,
        phone: String,
        email: String,
    }],
    
    demanderScore: [Number],
    SupplierScore: [Number],
});


// 設定密鑰
const SECRET = 'WebProgrammingFinal'


UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJwt = function() {
    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() +  90);
  
    return jwt.sign({
        id: this._id,
        NTUID: this.NTUID,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, SECRET);
}

UsersSchema.methods.toAuthJson = function() {
    return {
        _id: this._id,
        NTUID: this.NTUID,
        token: this.generateJwt(),
    };
};

const User = mongoose.model('User', UsersSchema);
module.exports = User