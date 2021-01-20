// import express from 'express';
const express = require("express");
const router = express.Router();

// const User = require('./models/User')
const mongoose = require('mongoose');
const User = mongoose.model('User');

const passport = require('passport');
const auth = require('../config/auth');

function checkIDlegal(NTUID){
    console.log("NTUID:",NTUID)
    
    let re = /[rRbBdD][0-9]{2}[0-9AB][0-9]{5}/;
    if(typeof NTUID !== "string" || NTUID.length!==9 || !NTUID.match(re) ){
        return false
    }

    return true
}

//先註冊
router.post('/register', (req, res, next) => {     // req.body:  NTUID, password
    console.log('registerRoute'); 
    console.log('Got body:', req.body); 

    if(!req.body.NTUID) {
        return res.json({ registerResult:{ success: false, msg: '註冊錯誤：學號為必填'}});
    }
    if(!req.body.password) {
        return res.json({ registerResult:{ success: false, msg: '註冊錯誤：密碼為必填' }});
    }
    User.find({ 'name': req.body.name }).then((user) => {
        if (user.length != 0){
            return res.json({ registerResult:{ success:false, msg:'註冊錯誤：該用戶名已被註冊'}})
        } 
    })   
 
    User.find({ 'NTUID': req.body.NTUID }).then((user) => {
        if (user.length != 0){
             // 已經註冊了
            return res.json({ registerResult:{ success:false, msg:'註冊錯誤：帳號已經註冊'}})
        } else {
            // 尚未註冊
            // 檢查ＩＤ合法性
            let IDlegal = checkIDlegal(req.body.NTUID);
            if (!IDlegal){
                return res.json({ registerResult: { success:false, msg:'註冊錯誤：學號不合法'}})
            }
            
            const newUser = new User({ NTUID : req.body.NTUID, name : req.body.name });
            newUser.setPassword(req.body.password);
        
            // 如果註冊後倒回登入頁面
            // newUser.save()
            //     .then((user) => { 
            //         return res.json({ registerResult: { success: true, msg:'註冊成功！'} })
            // });
        
            // 註冊後直接進入主頁
            newUser.save().then((user) => { 
                user.token = user.generateJwt();
                return res.json({ registerResult: { success: true, msg:'註冊成功！', user: user.toAuthJson()} })
            });
        }
    });
});

//登入
router.post('/login', auth.optional, (req, res, next) => {  // req.body:  NTUID, password
    const { user } = req.body;

    console.log('loginRoute'); 
    console.log('Got body:', req.body); 
    console.log('Got user:', user); 

    // 繞過前端的必填才有可能到這裡
    if(!user.NTUID) {
        return res.json( { loginResult: { success: false, msg: '登入錯誤：學號為必填'} } );
    }
    if(!user.password) {
        return res.json( { loginResult: { success: false, msg: '登入錯誤：密碼為必填' } } );
    }
    
    // 還沒註冊
    User.find({ 'NTUID': user.NTUID }).then((findUser) => {
        console.log('findUser:',findUser)
        if (findUser.length == 0){
            return res.json({ loginResult: { success: false, msg:'使用者尚未註冊，請先註冊'} });
        }else {
             // 驗證
        passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        console.log("authenticate");
            if(err) {
                return res.json({loginResult: { success: false, msg:'登入失敗：發生不明錯誤，請洽系統管理員'}});
            }
    
            if(passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJwt();
                return res.json({loginResult:{ user: user.toAuthJson(), success: true, msg:'登入成功' }});
            }
        
            return res.json({ loginResult: { success:false, msg:'登入失敗：密碼錯誤'} } );
          })(req, res, next);
        }
    });    
});

module.exports = router;