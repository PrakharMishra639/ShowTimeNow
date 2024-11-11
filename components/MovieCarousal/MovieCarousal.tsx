import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// import MovieCard from './MovieCard';


import { MovieCardType } from '@/types/types';
import MovieCard from './MovieCard';


const MovieCarousal = () => {
  const [user, setUser] = React.useState<any>(null)
const getuser = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log(response)
            if(response.ok){
                setUser(response.data)
            }
            else{
                window.location.href = "/auth/signin"
            }
        })
        .catch((error) => {
            console.log(error)
        })

}

// Movie data with valid image URLs for all entries

const [movies, setMovies] = React.useState<MovieCardType[]>([])

const getMovies = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.ok){
                // console.log(data)
                setMovies(data.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
React.useEffect(() => {
  getMovies()
  getuser()
}, [])

return(
  <div className="sliderout max-w-[1520px] bg-slate-100 pt-[30px] mt-0  px-[50px]">
    <h3 className="pb-[20px] pt-[10px] text-2xl font-bold text-slate-800">Recommended Movies</h3>
    {movies && user &&
      <Swiper
        slidesPerView={1}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
                    movies.map((movie) => {
                        return (
                            <SwiperSlide key={movie._id}>
                                <MovieCard 
                                    movie={movie}
                                    user={user}
                                />
                            <div className='pb-[40px] '>
                            <h4 className="movie-title text-center mt-2 text-xl font-semibold">{movie.title}</h4>
                            <p className="movie-type text-center text-gray-500 ">{movie.genre.join(", ")}</p>
                            </div>
                            </SwiperSlide>
                        )
                    })
                }
      </Swiper>
}
  </div>
)
  
};

export default MovieCarousal;
