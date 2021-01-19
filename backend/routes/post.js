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
    const { newPostForm } = req.body;
   
    // 前端有擋，後端也要檢查空值
    if(!newPostForm.title || !newPostForm.content){
      return res.json({ addNewPostResult:{ success: false, msg: '新增需求失敗'}});
    } else {
      //
      // 補上表單空值
      if(!newPostForm.needSupplyCnt){
        newPostForm.needSupplyCnt = 1;
      }
      if(!newPostForm.needSupplyCnt){
        newPostForm.needSupplyCnt = 1;
      }
      // 處理 tag

      // hot: '熱門', 8
      // current: '近期刊登', 4
      // highPayment: '高報酬', 2
      // urgent: '緊急任務', 1
      // all: '所有'
      newPostForm['tag'] = 4;

      var imgPath = [];
      if(newPostForm.fileList.length > 0){
        newPostForm.fileList.forEach(function(item, i) {
          imgPath.push(item.url);
        });
      }

      let newPost = new Demand({ 
        title: newPostForm.title, 
        content: newPostForm.content,
        deadline: newPostForm.deadline, 
        price: newPostForm.price,
        imgPath: imgPath,
        category: newPostForm.category,
        needSupplyCnt: newPostForm.needSupplyCnt,
        NTUID:  newPostForm.NTUID,

        name: newPostForm.name,
        
        postDate: new Date(),
        tag: newPostForm.tag,
        state: 'onDemand',
        isOpen: true,
        supplyCnt: 0,
        supplyList:[],
      });

    //  TODO:新增進ＤＢ失敗
      newPost.save().then((getNewPost) => { 
        console.log("新增需求成功,新需求: ");
        console.log(getNewPost);
        return res.json({ addNewPostResult:{ success: true, msg: '新增需求成功', newPost: getNewPost}});
      });
  
    }
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
router.post('/getUserPosts', (req, res) => { 
  console.log('getUserPosts');
  //TODO 抓DB資料
  console.log(req.body);

  const  { NTUID }  = req.body;

  Demand.find({ NTUID: NTUID})
  .then((findDemand) => {
    console.log(findDemand);
    return res.json({ userPostsResult: findDemand });
  });

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
    console.log("uploadImageRoute");
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