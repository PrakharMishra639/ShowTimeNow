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




        // {
        //     "_id": "65101a2acc5b257e6f2816a5",
        //     "title": "Jawan",
        //     "description": "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
        //     "portraitImgUrl": "http://res.cloudinary.com/dy4laycuf/image/upload/v1695554088/wbfwtq1nksdazxdrelxa.webp",
        //     "landscapeImgUrl": "http://res.cloudinary.com/dy4laycuf/image/upload/v1695554090/s3iwjeae4nev6ug3r0et.png",
        //     "rating": 8,
        //     "genre": [
        //         "Action",
        //         "Thriller"
        //     ],
        //     "duration": 130,
        //     "cast": [],
        //     "crew": [],
        //     "__v": 0
        // }
    }
   

    React.useEffect(() => {
        getMovie()
    }, [])


    // const movie = {
    //     widePoster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/joker-folie-a-deux-et00352820-1727168074.jpg",
    //     portraitPoster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/joker-folie-a-deux-et00352820-1727168074.jpg",
    //     title: "Joker",
    //     rating: 4.7,
    //     votes:"23.4K Votes",
    //     halls: ["2D,", "4DX,","ICE,","IMAX 2D"],
    //     languages: ["English"],
    //     duration: "2h 16m",
    //     type: "Drama,Suspense, Thriller",
    //     releaseDate: "2 Oct,2024",
    //     casts: [
    //       {
    //         _id: "1",
    //         name: "Joaquin Phoenix",
    //         role: "Lead Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/joaquin-phoenix-1004-01-10-2019-11-38-52.jpg",
    //       },
    //       {
    //         _id: "2",
    //         name: "Lady Gaga",
    //         role: "Supporting Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/lady-gaga-38097-29-11-2016-06-25-04.jpg",
    //       },
    //       {
    //         _id: "3",
    //         name: "Brendon Gleeson",
    //         role: "Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/brendan-gleeson-352-24-03-2017-12-32-59.jpg",
    //       },
    //       {
    //         _id: "4",
    //         name: "Catherine Keener",
    //         role: "Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/catherine-keener-15973-24-03-2017-12-38-08.jpg",
    //       },
    //       {
    //         _id: "5",
    //         name: "Joaquin Phoenix",
    //         role: "Lead Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/joaquin-phoenix-1004-01-10-2019-11-38-52.jpg",
    //       },
    //       {
    //         _id: "6",
    //         name: "Lady Gaga",
    //         role: "Supporting Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/lady-gaga-38097-29-11-2016-06-25-04.jpg",
    //       },
    //       {
    //         _id: "7",
    //         name: "Brendon Gleeson",
    //         role: "Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/brendan-gleeson-352-24-03-2017-12-32-59.jpg",
    //       },
    //       {
    //         _id: "8",
    //         name: "Catherine Keener",
    //         role: "Actor",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/catherine-keener-15973-24-03-2017-12-38-08.jpg",
    //       }
    //     ],
    //     crews: [
    //       {
    //         _id: "1",
    //         name: "Todd Philips",
    //         role: "Director",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/todd-phillips-12930-24-03-2017-14-03-30.jpg",
    //       },
    //       {
    //         _id: "2",
    //         name: "Scott silver",
    //         role: "Producer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/scott-silver-1061080-24-03-2017-16-20-51.jpg",
    //       },
    //       {
    //         _id: "3",
    //         name: "Michael Uslan",
    //         role: "Cinematographer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/michael-uslan-iein099202-28-02-2022-14-44-03.jpg",
    //       },
    //       {
    //         _id: "4",
    //         name: "Lawrence sher",
    //         role: "Cinematographer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/michael-uslan-iein099202-28-02-2022-14-44-03.jpg",
    //       },
    //       {
    //         _id: "5",
    //         name: "Todd Philips",
    //         role: "Director",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/todd-phillips-12930-24-03-2017-14-03-30.jpg",
    //       },
    //       {
    //         _id: "6",
    //         name: "Scott silver",
    //         role: "Producer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/scott-silver-1061080-24-03-2017-16-20-51.jpg",
    //       },
    //       {
    //         _id: "7",
    //         name: "Michael Uslan",
    //         role: "Cinematographer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/michael-uslan-iein099202-28-02-2022-14-44-03.jpg",
    //       },
    //       {
    //         _id: "8",
    //         name: "Lawrence sher",
    //         role: "Cinematographer",
    //         imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/michael-uslan-iein099202-28-02-2022-14-44-03.jpg",
    //       }
    //     ],
    //     about:"Joker: Folie A Deux finds Arthur Fleck institutionalized at Arkham awaiting trial for his crimes as Joker.While struggling with his dual identity, Arthur not only stumbles upon true love, but also finds the music that`s always been inside him."
    //   };
      
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
                      {/* <div className='halls_languages  flex gap-[10px]'>
                  <p className='halls  bg-white bg-opacity-90 text-black px-[10px] 
                  py-[5px] rounded-sm text-sm font-semibold'>
                      {
                          movie.halls.map((hall, index) => {
                              return (
                                  <span key={index}>{hall} </span>
                              )
                          })
                      }
                  </p>
                  <p className='languages bg-white bg-opacity-90 text-black px-[10px] py-[5px]
                   rounded-sm text-sm font-semibold'>
                      {movie.languages.map((language, index) => {
                          return (
                              <span key={index}>{language} </span>
                          )
                      })}
                  </p>
              </div> */}
                      <p className='duration_type_releasedat flex gap-[5px]'>
                          <span className='duration'>
                              {movie.duration}min
                          </span>
                          <span>•</span>
                          <span className='type'>
                              {movie.genre.join(', ')}
                          </span>
                          {/* <span>•</span>
                  <span className='releasedat'>
                      {movie.releasedate}
                  </span> */}
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
                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className="celebcard flex flex-col justify-center items-center w-full mb-[40px]">
                                                    <Image className="w-[80%] h-full object-cover rounded-full" src={cast.celebImage}  width={200} height={200} />
                                                      <h3 className="text-lg text-black font-semibold">{cast.celebName}</h3>
                                                      <h4 className="text-sm text-gray font-normal">{cast.celebRole}</h4>
                                                   </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
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
                      {
                          movie.crew.map((cast, index) => {
                              return (
                                  <SwiperSlide key={index}>
                                     <div className="celebcard flex flex-col justify-center items-center w-full mb-[40px]">
                                                    <Image className="w-[80%] h-full object-cover rounded-full" src={cast.celebImage}  width={200} height={200} />
                                                      <h3 className="text-lg text-black font-semibold">{cast.celebName}</h3>
                                                      <h4 className="text-sm text-gray font-normal">{cast.celebRole}</h4>
                                                   </div>
                                  </SwiperSlide>
                              )
                          })
                      }
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