import express from 'express';
const router = express.Router();

function checkIDlegal(NTUID){

    //TODO: 檢查DB 是否重複註冊
     
    if(typeof NTUID !== String || NTUID.length!==9 || ){
        return false
    }

    return true
}

//先註冊
router.post('/login/register', (req, res) => { 
    console.log('request:',req);
    let check = checkIDlegal(req.query.NTUID)
    res.send(`register ${check?"SUCCESS":"FAILED"}`);
    

});

//登入
router.post('/login', (req, res) => { 
    
    

});

export default router