import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomeSlider = () => {
  const [banners, setBanners] = useState([
    {
      imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg',
    },
    {
      imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1728030064324_copyof1240x300webcarousel.jpg',
    },
    {
      imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1728051557401_gauravguptalivetalkatorastadiumshowwebshowcase1240x300.jpg',
    },
  ]);
  return (
    <div className='w-full mx-0 my-0 max-w-[1650px]  relative shadow-lg'>
     <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
         {
                banners.map((banner, index) => {
                    return (
                        <SwiperSlide key={index} >
                            <Image src={banner.imgUrl} alt="" width={1600} height={1000}
                                style={{
                                    objectFit: "cover"
                                }} />
                        </SwiperSlide>
                    )
                })
            }
      </Swiper>
    </div>
  )
}

export default HomeSlider