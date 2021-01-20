import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
// import Carousel from 'react-grid-carousel'
// import Carousel from './Carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './home.scss'
import {getAll} from '../../axios'
import MyCarousel from './components/MyCarousel'
import Marquee from "react-smooth-marquee"
import want1 from '../../assets/images/test_wanted/test_wanted_1.jpg'
import want2 from '../../assets/images/test_wanted/test_wanted_2.jpg'
import want3 from '../../assets/images/test_wanted/test_wanted_3.jpg'

const post = [
  {
    src: want1,
    altText: 'Wanted 1',
    name: '魯夫',
    title: '我想要有人教我微積分',
    postDate: 'Mon Jan 18 2021',
    content: '拜託啦我快被當第二次了嗚嗚嗚嗚，',
    price: 1000,
    postID: 'e213dfdfcxcvbgfj',
    caption: ''
  },
  {
    src: want2,
    altText: 'Wanted 2',
    name: '革命軍-薩波',
    title: '我想要喝台大牛奶',
    postDate: 'Wen Jan 13 2021',
    price: 0,
    content: '幫我外送宿舍,如果願意幫忙我我可以任選一首歌唱給妳聽',
    postID: 'asdaseqweqqeeqw',
    caption: ''
  },
  {
    src: want3,
    altText: 'Wanted 3',
    name: '香吉士',
    title: '徵網頁寫手',
    postDate: 'Tue Jan 5 2021',
    price: 81000,
    content: '有人可以幫忙寫Web final的網頁前後端嗎，github帳號給我，公道價',
    postID: 'sadhqwiudhqwdh',
    caption: ''
  }
];

function Home(props) {
  const [postdata, setPostdata] = useState(post)
  console.log('Home props:',props)
  const NTUID = window.localStorage.getItem('NTUID')
  console.log('window.localStorage:',window.localStorage.getItem('NTUID'))

  const refreshPostTable = async ()=>{
    //這邊要從後端動態拿post資料
    // post =  await getAll(NTUID)
    var getData = await getAll(NTUID)
    setPostdata(getData)
    console.log('home post:',postdata)
    let now = Date.now();
    const today = new Date(now);
    console.log('now:',now)
    console.log('today:',today.toDateString())
  }

  useEffect(refreshPostTable,[])


  return(
    <>

      <div className="carousel-display">
        <MyCarousel posts={postdata} NTUID={NTUID} onSupply={refreshPostTable}/>
      </div>
      <div className="home-footer">
          <Marquee>
            <a href='https://www.facebook.com/groups/NTU.Head?sorting_setting=CHRONOLOGICAL'>我們同時也致力於關心校園大小時事，並永遠跟您一同站在世界的最前線，點選連結即可前往最可靠的第一手消息來源.........</a>
          </Marquee>
          <div className="others">
            {/* TODO: 這邊可以做一些提示語或是每日流行標語的隨機輪轉 */}
            <section className="notice-text">
              左右鍵快速滑動需求單，點擊或按Enter了解該需求單詳情
            </section>  
          </div>
      </div>
    </>

  )
}

export default Home
