// import express from 'express';
const express = require("express");
const router = express.Router();

function checkIDlegal(NTUID){
    console.log("NTUID:",NTUID)
    //TODO: 檢查DB 是否重複註冊
    let re = /[rRbBdD][0-9]{2}[0-9AB][0-9]{5}/;
    if(typeof NTUID !== "string" || NTUID.length!==9 || !NTUID.match(re) ){
        return false
    }

    return true
}

//先註冊
router.post('/register', (req, res) => { 
    console.log('Got body:', req.body);
    // console.log('request:',req);
    let check = checkIDlegal(req.body.NTUID);
    let resstr = `register ${check?"SUCCESS":"FAILED"}`;
    console.log('response:',resstr);
    // res.send(resstr);
    res.json({register:{token:"testing-WUYQASBK981y3jasbdGI",registered:check}});
    

});

//登入
router.post('/login', (req, res) => { 
    
    

});

module.exports = router;