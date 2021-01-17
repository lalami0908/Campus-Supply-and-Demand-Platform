import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
// import Carousel from 'react-grid-carousel'
import Carousel from './Carousel'
// import '../test.css'

function Home() {

  function genItems(){
    const testFolder = '../../assets/images/test_wanted/';

    return(
            <>
              {         
                [1,2,3,4,5,6,7].forEach(num => {
                  console.log(num);
                  return(
                    <Carousel.Item>
                      <img width="100%" src={`${testFolder}`+'test_wanted_'+ num +'.jpg'} />
                    </Carousel.Item>
                  )
                })
              }
            </>
    )
  }

  return(
    <>
      <div style={{
        backgroundImage: 'url(`../../assets/images/test_wanted/test_wanted_2.jpg`)',
        height: '10vh',
        width: '10vw'
      }}>

      </div>
      <img width="100%" src={require("../../assets/images/test_wanted/test_wanted_2.jpg")} />
      <img width="100%" src="../../assets/images/test_wanted/test_wanted_3.jpg" />
      <img width="100%" src="../../assets/images/test_wanted/test_wanted_4.jpg" />
    </>

    // <Carousel cols={2} rows={1} gap={10} loop>
    //   <Carousel.Item>
    //     <img width="100%" src="../../assets/images/test_wanted/test_wanted_1.jpg" />
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img width="100%" src="../../assets/images/test_wanted/test_wanted_2.jpg" />
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img width="100%" src="../../assets/images/test_wanted/test_wanted_3.jpg" />
    //   </Carousel.Item>

    //   {/* {
    //     genItems()

    //   } */}
    // </Carousel>

  //hard to fix them QQ
  //   <div class="hot_list">
  //   <div class="hot_banner_box">
  //     <div class="banner-top">
  //       <ul class="swiper-wrapper vodlist clearfix">
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/115812.html"
  //             title="驅魔麵館"
  //             data-background="../../assets/images/test_wanted_1.jpg"
  //             ><span class="play hidden_xs">
  //               <img src="../../assets/images/test_wanted_1.jpg"></img>
  //             </span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">驅魔麵館</p>
  //               <p class="vodlist_sub">
  //                 趙炳奎&nbsp;金世正&nbsp;劉俊相&nbsp;廉惠蘭&nbsp;安錫煥&nbsp;崔允英&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/116921.html"
  //             title="Hush沉默警報"
  //             data-background="https://img.1777cdn.com/upload/vod/20201230-1/51839c0a3e1c509419e71a3bb9cef9d2.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">Hush沉默警報</p>
  //               <p class="vodlist_sub">
  //                 黃政民&nbsp;林允兒&nbsp;樸浩山&nbsp;景收真&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/117056.html"
  //             title="哲仁王后"
  //             data-background="https://img.1777cdn.com/upload/vod/20201213-1/f6b24135f7a42d9149f5147b49b58bdd.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">哲仁王后</p>
  //               <p class="vodlist_sub">
  //                 申惠善&nbsp;金正賢&nbsp;裴宗玉&nbsp;金泰宇&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/119754.html"
  //             title="緊急公關"
  //             data-background="https://img.1777cdn.com/upload/vod/20210116-1/f3a7c5bd9c60008463a30aeb6f3ed97c.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">緊急公關</p>
  //               <p class="vodlist_sub">
  //                 黃曉明&nbsp;蔡文靜&nbsp;譚卓&nbsp;張博&nbsp;林佑威&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/119209.html"
  //             title="靈域"
  //             data-background="https://img.1777cdn.com/upload/vod/20210110-1/145598366e11ed3644c13e96fd3a3dda.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">靈域</p>
  //               <p class="vodlist_sub">
  //                 范丞丞&nbsp;程瀟&nbsp;劉一曈&nbsp;聶子皓&nbsp;馬月&nbsp;鄭藝彬&nbsp;王一鳴&nbsp;葛鑫怡&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/115757.html"
  //             title="未來媽媽"
  //             data-background="https://img.1777cdn.com/upload/vod/20201211-1/ef783bb85c50f496a97c362571833e51.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">未來媽媽</p>
  //               <p class="vodlist_sub">Mother&nbsp;to&nbsp;be&nbsp;</p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/118181.html"
  //             title="流金歲月"
  //             data-background="https://img.1777cdn.com/upload/vod/20201228-1/59bb370d907c37271c106b77fe1c2f80.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">流金歲月</p>
  //               <p class="vodlist_sub">
  //                 劉詩詩&nbsp;倪妮&nbsp;董子健&nbsp;田雨&nbsp;王驍&nbsp;楊祐寧&nbsp;楊玏&nbsp;陳道明&nbsp;袁泉&nbsp;何泓姍&nbsp;吳越&nbsp;于小偉&nbsp;張晨光&nbsp;是安&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/117790.html"
  //             title="愛在大都會"
  //             data-background="https://img.1777cdn.com/upload/vod/20201223-1/e0a9dc01c860ab5ddd3a86d8c39b4acc.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">愛在大都會</p>
  //               <p class="vodlist_sub">池昌旭&nbsp;金智媛&nbsp;</p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //         <li class="balist_item swiper-slide">
  //           <a
  //             class="balist_thumb swiper-lazy"
  //             href="https://777tv.net/vod/detail/id/116738.html"
  //             title="女神降臨"
  //             data-background="https://img.1777cdn.com/upload/vod/20201210-1/984c19899bbf7d14f79e8240c943c559.jpg"
  //             ><span class="play hidden_xs"></span>
  //             <div class="balist_titbox pic_text">
  //               <p class="vodlist_title">女神降臨</p>
  //               <p class="vodlist_sub">
  //                 文佳煐&nbsp;車銀優&nbsp;黃仁燁&nbsp;樸柔娜&nbsp;樸浩山&nbsp;張慧珍&nbsp;林世美&nbsp;金民起&nbsp;鄭俊鎬&nbsp;吳義植&nbsp;申宰輝&nbsp;全惠媛&nbsp;姜敏兒&nbsp;姜澯熙&nbsp;
  //               </p>
  //             </div>
  //             <span class="balist_bg"></span
  //           ></a>
  //         </li>
  //       </ul>
  //     </div>
  //     <div class="banner-arrow">
  //       <a class="swiper-button-prev" href="javascript:;"
  //         ><i class="iconfont">&#xe625;</i></a
  //       ><a class="swiper-button-next" href="javascript:;"
  //         ><i class="iconfont">&#xe623;</i></a
  //       >
  //     </div>
  //   </div>
  // </div>
)
}

export default Home
