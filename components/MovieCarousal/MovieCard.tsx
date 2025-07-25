"use client"
import React from 'react'; 
import { MovieCardType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { BsFillStarFill } from 'react-icons/bs';

const MovieCard = (data:any) => {
  const {_id, title, genre, rating, portraitImgUrl} = data.movie;
  const router = useRouter();
  const { city } = data.user;
  console.log(city)


  return (
    <div
      className='movieCard rounded-xl overflow-hidden relative cursor-pointer flex flex-col h-[400px] shadow-sm w-full md:w-5/6'
      onClick={() => {
        router.push(`/${city}/movies/${_id}`)
      }}
    >
 <div
        className="movieimg object-contain bg-cover bg-center w-full h-[400px] relative"
        style={{
          backgroundImage: `url(${portraitImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        < div className="rating absolute text-white bg-black bg-opacity-90 w-full p-[5px] bottom-0 flex items-center justify-between">
         
          <p className='flex justify-between'>
          <BsFillStarFill className='star text-yellow-400' />&nbsp;&nbsp;
          {rating}/10
          </p>
          23.5K Votes
        </div>
       

      </div>
    </div>
  );
};

export default MovieCard;