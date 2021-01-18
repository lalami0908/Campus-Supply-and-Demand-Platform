import React, { useState , useEffect} from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const MyCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    
    //init: 從後端抓所有的需求單
    useEffect(()=>{
        // const post = props.posts//後端資料
    },[])


    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === props.posts.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? props.posts.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const demands = props.posts.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >  
            <div style={{
                // 
            }}>
                {/* 將圖片以外的資訊做在這 */}
            </div>
          <img src={item.src} alt={item.altText} style={{
              borderRadius: '10%',
              width: '40vw',
              height: '70vh',

              position: 'relative',
              left: '20vw'
          }}/>
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={props.posts} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {demands}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
}
  
export default MyCarousel;