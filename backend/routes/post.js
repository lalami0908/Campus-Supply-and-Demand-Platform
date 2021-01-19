const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path')

// const Demand = require('../models/Demand')
// const Supply = require('../models/Supply')
const Demand = mongoose.model('Demand');
const Supply = mongoose.model('Supply');

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
    if(!newPostForm.title || !newPostForm.NTUID || !newPostForm.content || !newPostForm.deadline || !newPostForm.price || !newPostForm.category){
      return res.json({ addNewPostResult:{ success: false, msg: '新增需求失敗，需求單位填寫完整'}});
    } 
    //
    // 補上表單空值
    if(!newPostForm.needSupplyCnt){
      newPostForm.needSupplyCnt = 1;
    }
    if(!newPostForm.needSupplyCnt){
      newPostForm.needSupplyCnt = 1;
    }
    // 處理 tag
    //這段用來產生tag (熱門、最新、緊急、高報酬 分別對應8 4 2 1)
    if(newPostForm.NTUID.substring(1, 3)==='09'){//TODO:熱門的判定方法，或留給server黑箱收廣告費好了
      //09優先 友善新生XD
      newPostForm.tag | 8
    }
    //"最新"這個tag應該是留到query時才上，把當天的補上tag再回傳回前端
    // if(){
    //   newPost.tag | 4
    // }
    if(parseInt(Math.abs(newPostForm.postDate - newPostForm.deadline) / 1000 / 60 / 60 / 24)<=3){//3天內
      newPostForm.tag | 2
    }
    if(newPostForm.price > 918){//TODO:之後server端寫個高效能的排序一下，別每次add new就重新排序，例如可以維護一個只跟價格有關的資料結構
      newPostForm.tag | 1
    }
    // newPostForm['tag'] = 4;

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
  
    
});

router.get('/getAllPosts', (req, res) => { 
    res.send('getAllPosts');
    //TODO 抓DB資料
  console.log(req.body);
  Demand.find().then((posts) => {
    //{ 'NTUID': req.body.NTUID } 濾掉自己的post
    return res.json({allPosts:posts.filter(post=>post.NTUID!==req.body.NTUID)})
  })
  
});
router.get('/getTagPosts', (req, res) => { 
  res.send('getTagPosts');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({tagPosts:[]})
});
router.post('/getUserPosts', async (req, res) => { 
  console.log("getUserPosts");
  console.log(req.body);
  console.log(req.body.NTUID);
  Demand.find({NTUID:req.body.NTUID}).then((posts) => {
    console.log(posts);
    return res.json({userPosts:posts});
  })
});

router.get('/getUserSupplies', (req, res) => { 
  res.send('getUserSupplies');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({userSupplies:[]})
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