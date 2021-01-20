const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
        name: this.name,
    };
};

const User = mongoose.model('User', UsersSchema);
module.exports = User