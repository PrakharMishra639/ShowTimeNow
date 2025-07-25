"use client"
import React from 'react'
import { BsShare } from 'react-icons/bs'
import { BsFillStarFill } from 'react-icons/bs';
import Image from 'next/image';
import MovieCarousel from '@/components/MovieCarousal/MovieCarousal';


import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
type Cast = {
    celebImage: string;
    celebName: string;
    celebRole: string;
  };
  
  type Crew = {
    celebImage: string;
    celebName: string;
    celebRole: string;
  };
  
  


const MoviePage = () => {
    const pathname = usePathname()
    const { movieid } = useParams()
   
    const [movie, setMovie] = React.useState<any>(null)
    console.log(movieid)

    const getMovie = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }
   

    React.useEffect(() => {
        getMovie()
    }, [])


   
  return (
  <> 
 {
  movie && 
  <div className='moviepage flex flex-col'>
      <div className='c1 min-h-[50vh] bg-no-repeat bg-cover bg-center' style={{
          backgroundImage: `url(${movie.landscapeImgUrl})`
      }}>
          <div className='c11  min-h-[50vh] p-[50px] flex justify-between 
          bg-[linear-gradient(90deg,_rgb(0,_0,_0)_10%,_rgba(255,_255,_255,_0)_50%,_rgb(0,_0,_0)_90%)]'>
              <div className='left flex items-center gap-[20px]'>
                  <div className='movie_poster  w-[300px] h-[400px] rounded-lg overflow-hidden
                   relative bg-no-repeat bg-cover bg-center'
                      style={{
                          backgroundImage: `url(${movie.portraitImgUrl})`
                      }}
                  >
                      <p className="absolute bottom-0 bg-black text-white text-center w-full p-[3px]">In cinemas</p>
                  </div>
                  <div className='movie_details flex flex-col text-white gap-[10px]'>
                      <p className='title text-4xl font-semibold '>
                          {movie.title}
                      </p>
                      <div className='rating flex justify-between items-center font-semibold py-[10px] 
                      px-[30px] bg-zinc-800 rounded-lg'>
                           <div className="flex items-center">
    <BsFillStarFill className="text-red-500 text-xl mr-2" />
    <p className="text-xl mr-2">{movie.rating}/10 </p>
    <span className="mr-[2px]">(23.5K votes)</span>
    <MdOutlineKeyboardArrowRight className="text-xl mr-8" />
  </div>
  <p className="px-[10px] py-[3px] leading-9 text-black text-lg ml-6 bg-white rounded-lg font-semibold">
    Rate Now
  </p>
                      </div>
                   
                      <p className='duration_type_releasedat flex gap-[5px]'>
                          <span className='duration'>
                              {movie.duration}min
                          </span>
                          <span>•</span>
                          <span className='type'>
                              {movie.genre.join(', ')}
                          </span>
                       
                      </p>
                      <Link
                          href={`${pathname}/buytickets`}
                          className='linkstylenone'
                      >
                          <button className=" bg-red-500 bg-opacity-90 text-white border-none rounded-md
                           px-[60px] py-[10px] text-lg font-normal cursor-pointer w-fit">Book Tickets</button>
                      </Link>

                  </div>
              </div>
              <div className='right relative'>

                  <button className='sharebtn  bg-[rgb(21,21,21)] opacity-70 text-white border-none rounded-md px-[30px] py-[10px] text-lg font-normal absolute
                   cursor-pointer right-0  top-0 flex items-center gap-[5px] '><BsShare className='shareicon' />Share</button>
              </div>
          </div>
      </div>
      <div className='c2 p-[50px] flex flex-col gap-[10px] w-[70%]'>
          <h1 className="text-2xl font-semibold w-fit p-0 text-black">About the Movie</h1>
          <p className="text-lg font-normal text-gray-500">{movie.description}</p>
          <div className='line w-full h-[1px] mx-[30px] my-0 bg-gray-200 '></div>
          <h1  className="text-2xl font-semibold w-fit p-0 text-black">Cast</h1>
          {
              movie.cast.length>0 &&
              <div className='circlecardslider'>
                  <div className='line'></div>

                
                  <Swiper
                      slidesPerView={1}
                      spaceBetween={1}
                      pagination={{
                          clickable: true,
                      }}
                      breakpoints={{
                          '@0.00': {
                              slidesPerView: 1,
                              spaceBetween: 2,
                          },
                          '@0.75': {
                              slidesPerView: 2,
                              spaceBetween: 2,
                          },
                          '@1.00': {
                              slidesPerView: 3,
                              spaceBetween: 2,
                          },
                          '@1.50': {
                              slidesPerView: 6,
                              spaceBetween: 2,
                          },
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                  >
                    {movie.cast.map((cast: Cast, index: number) => (
  <SwiperSlide key={index}>
    <div className="celebcard flex flex-col justify-center items-center w-full mb-[40px]">
      <Image
        className="w-[80%] h-full object-cover rounded-full"
        src={cast.celebImage}
        width={200}
        height={200}
        alt={`${cast.celebName}'s image`}
      />
      <h3 className="text-lg text-black font-semibold">{cast.celebName}</h3>
      <h4 className="text-sm text-gray font-normal">{cast.celebRole}</h4>
    </div>
  </SwiperSlide>
))}
                  </Swiper>
              </div>
          }
                  <div className='line w-full h-[1px] mx-[30px] my-0 bg-gray-200'></div>
                  <h1  className="text-2xl font-semibold w-fit p-0 text-black">Crew</h1>
          {
    
              movie.crew.length>0 &&
              <div className='circlecardslider'>
                  <div className='line'></div>

                
                  <Swiper
                      slidesPerView={1}
                      spaceBetween={1}
                      pagination={{
                          clickable: true,
                      }}
                      breakpoints={{
                          '@0.00': {
                              slidesPerView: 1,
                              spaceBetween: 2,
                          },
                          '@0.75': {
                              slidesPerView: 2,
                              spaceBetween: 2,
                          },
                          '@1.00': {
                              slidesPerView: 3,
                              spaceBetween: 2,
                          },
                          '@1.50': {
                              slidesPerView: 6,
                              spaceBetween: 2,
                          },
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                  >
                    {movie.crew.map((crew: Crew, index: number) => (
  <SwiperSlide key={index}>
    <div className="celebcard flex flex-col justify-center items-center w-full mb-[40px]">
      <Image
        className="w-[80%] h-full object-cover rounded-full"
        src={crew.celebImage}
        width={200}
        height={200}
        alt={`${crew.celebName}'s image`}
      />
      <h3 className="text-lg text-black font-semibold">{crew.celebName}</h3>
      <h4 className="text-sm text-gray font-normal">{crew.celebRole}</h4>
    </div>
  </SwiperSlide>
))}


                  </Swiper>
              </div>
          }
          <div className='line w-full h-[1px] mx-[30px] my-0 bg-gray-200'></div>
          <h1 className="text-2xl font-semibold w-fit p-0 text-black">Your might also like</h1>
          <MovieCarousel />
      </div>

  </div>
 } 
  </>
  )
  }



export default MoviePage