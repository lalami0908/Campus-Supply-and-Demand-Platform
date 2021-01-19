const express = require("express");
const router = express.Router();

const Demand = require('../models/Demand')
const Supply = require('../models/Supply')


const path = require('path')
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
    console.log(req);
    res.send('test3');
    

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
  
  return res.json({allPosts:[]})
});
router.get('/getTagPosts', (req, res) => { 
  res.send('getTagPosts');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({tagPosts:[]})
});
router.get('/getUserPosts', (req, res) => { 
  res.send('getUserPosts');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({userPosts:[]})
});

router.put('/updateYourPost', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});

router.get('/supplyPost', (req, res) => { 
  res.send('supplyPost');
  //TODO 修改DB資料，將需求單的state做更動
  console.log(req.body.text);

  return res.json({feedback:{ success: true, msg:'應徵成功'}})
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