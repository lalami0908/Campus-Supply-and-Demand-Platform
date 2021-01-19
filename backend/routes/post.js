const express = require("express");
const router = express.Router();
const path = require('path')

const Demand = require('../models/Demand')
const Supply = require('../models/Supply')


const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 上傳文件儲存目錄
      cb(null, 'public/uploads')
    },
    filename(req, file, cb) {
      //使用時間為文件命名
      const extname = path.extname(file.originalname)
      cb(null, Date.now() + extname)
    }
  })
})



router.post('/addNewPost', (req, res) => { 
    console.log("addNewPost");
    newPostForm: 
    console.log();
    const { newPostForm } = req.body;
    console.log(newPostForm);
    // 檢查空值
    if(!newPostForm.title || !newPostForm.content){
      return res.json({ addNewPostResult:{ success: false, msg: '新增需求失敗'}});
    } else {
      //
       補上表單空值
      if(!newPostForm.needSupplyCnt){
        newPostForm.needSupplyCnt = 1;
      }
      if(!newPostForm.needSupplyCnt){
        newPostForm.needSupplyCnt = 1;
      }


      // let newPost = new Demand({ 
      //   title: payload.name, 
      //   content: payload.body,
      //   deadline:
      //   price:
      //   imgPath:
      //   category:
      //   needSupplyCnt:
      //   NTUID: 
      //   name: 
      //   postDate: new Date(),
      //   tag

      
      // });
      newMessage.save(function (err) {
          if (err) return handleError(err);
          // saved!
      });

    }



    
    // return res.json({ addNewPostResult:{ success: true, msg: '新增需求成功'}});
    // let newPost = new Demand({ name: payload.name, body: payload.body });
    //       newMessage.save(function (err) {
    //         if (err) return handleError(err);
    //         // saved!
    //       });

    

	// console.log(req.body.text);
});

router.get('/getAllPosts', (req, res) => { 
    res.send('getAllPosts');
    //TODO 抓DB資料
	console.log(req.body.text);
});

router.put('/updateYourPost', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});


// router.post('/uploadImage', (req, res) => { 
//     console.log(req);
//     console.log(req.body);
//     res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
//     res.send('uploadImage');
// });


router.post('/deleteImage', (req, res) => { 
    console.log(req);
    console.log(req.body);

    res.send('deleteImage');
});


router.post('/uploadImage', upload.single('file'), (req, res) => {
    const { file: { filename, path } } = req
    console.log(req.file);
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
    res.json({
      ok: true,
      message: '圖片上傳成功',
      data: {
        name: filename,
        url: path
      }
    })
})
  
  

module.exports = router;