const express = require("express");
const router = express.Router();
const path = require('path')
import {Demand,Supply } from '../models'


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
      var invailmsg = "新增需求失敗，需求單未填寫完整";
      console.log(invailmsg);
      return res.json({ addNewPostResult:{ success: false, msg: invailmsg}});
    } 
    //
    // 補上表單空值
    if(!newPostForm.needSupplyCnt){
      newPostForm.needSupplyCnt = 1;
    }

    // 處理 tag
    newPostForm.tag = 0 //init!
    //這段用來產生tag (熱門、最新、緊急、高報酬 分別對應8 4 2 1)
    if(newPostForm.NTUID.substring(1, 3)==='09'){//TODO:熱門的判定方法，或留給server黑箱收廣告費好了
      //09優先 友善新生XD
      newPostForm.tag = newPostForm.tag | 8
    }
    //"最新"這個tag應該是留到query時才上，把當天的補上tag再回傳回前端
    // if(){
    //   newPost.tag | 4
    // }
    const postNow = new Date()
    const d = newPostForm.deadline.split('-')
    const postDeadline= new Date(d[0],d[1]-1,d[2],23,59,59); 
    console.log(`newPostForm.postDate:${postNow},newPostForm.deadline:${postDeadline}`)
    console.log('check data distance:',Math.abs(postNow - postDeadline))
    if(parseInt(Math.abs(postNow- postDeadline) / 1000 / 60 / 60 / 24)<=3){//3天內
      newPostForm.tag = newPostForm.tag | 2
    }
    if(newPostForm.price > 918){//TODO:之後server端寫個高效能的排序一下，別每次add new就重新排序，例如可以維護一個只跟價格有關的資料結構
      newPostForm.tag = newPostForm.tag | 1
    }
    // newPostForm['tag'] = 4;

    var imgPath = [];
    console.log('newPostForm.fileList:',newPostForm.fileList)
    if(newPostForm.fileList.length > 0){
      console.log('testing item.url')
      newPostForm.fileList.forEach(function(item, i) {
        imgPath.push(item.url);
        console.log('item.url:',item.url)
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
        
      postDate: postNow,
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

router.post('/getAllPosts', async (req, res) => { 
  console.log('getAllPosts');
  // console.log('req.body:',req.body);
  await Demand.find({state:'onDemand'}).then((posts) => {
    //濾掉自己的post
    console.log('取得所有不屬於自己，且狀態開啟的需求單',posts)
    return res.json({allPosts:posts.filter(post=>post.NTUID!==req.body.NTUID)})
  })
  
});
const tagValue = {
  hot: 8,
  current: 4,
  urgent: 2,
  highPayment: 1 
}
router.post('/getTagPosts',  async (req, res) => { 
  console.log('req.body:',req.body);
  let tag = tagValue[req.body.tag]
  await Demand.find({state:'onDemand'}).then((posts) => {
    console.log('posts:',posts)
    //濾掉自己的post
    return res.json({tagPosts:posts.filter(post=>post.NTUID!==req.body.NTUID&&((post.tag&tag)===tag))})
  })
});
// 我的需求頁面
router.post('/getUserPosts', async (req, res) => { 
  console.log("getUserPosts");
  console.log('req.body:',req.body);
  console.log(req.body.NTUID);
  // 關了應該也還要看得到吧？TODO:顯示需求單狀態
  Demand.find({NTUID:req.body.NTUID}).then((posts) => {
    console.log(posts);
    return res.json({userPosts:posts});
  })
});


router.post('/getUserSupplies', (req, res) => { 
  //TODO 抓DB資料
  console.log(req.body);

  Supply.find({NTUID:req.body.NTUID}).then((sups) => {
    console.log('sups:',sups);
    return res.json({userSupplies:sups});
  })
});

router.post('/getIdPost', (req, res) => { 
  console.log('getIdPost:',req.body);
  Demand.findById(req.body.postID).then((uniquePost) => {
    console.log(uniquePost);
    return res.json({uniquePost:uniquePost});
  })
});
router.post('/getIdPosts', (req, res) => { 
  console.log('getIdPosts ids:',req.body.postIDs);
  Demand.find().then((posts) => res.json({idPosts:posts.filter(post=>req.body.postIDs.includes(post._id.toString()))}))
});

//TODO
router.put('/updateYourPost', (req, res) => { 

	console.log(req.body.text);
});

router.put('/supplyPost', async(req, res) => { 
  console.log('supplyPost:',req.body);
  await Demand.findByIdAndUpdate(req.body.postID,{state:'onMatching'},(err,docs)=>{
    if (err){ 
      console.log(err) 
    } 
    else{ 
        console.log("Updated User : ", docs); 
    } 
  })//怎麼呼叫到原本DB裡面的supplyCnt?

  // let newSupply = new Supply({ 
  //   NTUID: req.body.NTUID,
  //   applyDate: new Date(), 
  //   demandId:  req.body.postID,
  // })

  await Supply.create({NTUID: req.body.NTUID,applyDate: new Date(),demandId:req.body.postID})
  return res.json({ feedback:{ success: true, msg: '供給成功'}});
   
  // return res.json({feedback:{ success: true, msg:'應徵成功'}})
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