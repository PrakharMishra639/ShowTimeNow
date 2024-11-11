"use client"
import React from 'react'
import DatePicker from "react-horizontal-datepicker";

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'

const BuyTicketsPage  = () => {
    const pathname = usePathname()
    const params = useParams()
    const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
    const { movieid, cityname } = params
    const [movie, setMovie] = React.useState<any>(null)
    const [theatres, setTheatres] = React.useState<any>(null)
    // const [selectedDate, setSelectedDate] = React.useState<any>(null)
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

    const getTheatres = async (date: string) => {
        let movieId = movieid
        let city = cityname

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/screensbymovieschedule/${city}/${date}/${movieId}`, {
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
                    setTheatres(data.data)
                }
                else {
                    console.log(data)
                }
            })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    React.useEffect(() => {
        getMovie()
    }, [])

    React.useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])


    // const movie = {
    //     moviename: 'Jawan',
    //     screen: '4Dx',
    //     date: new Date(),
    //     language: 'Hindi',
    //     type: 'Action/Thriller',
    //     screens: [
    //         {
    //             name: 'Screen 1',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 2',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 3',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         }
    //     ]
    // }



    return (
        <>
            {
                movie &&
                <div className='buytickets  gray-200 min-h-[100vh] w-full'>
                    <div className='s1  bg-white' >
                        <div className='head bg-slate-800 p-[20px]'>
                            <h1 className="text-white text-4xl font-semibold ">{movie.title} - {movie.language}</h1>
                            <h3 className="text-gray-500 text-sm font-semibold px-[10px] py-[5px]
                             rounded-2xl w-fit border border-gray-500">{movie.genre.join(",")}</h3>
                        </div>
                        <DatePicker getSelectedDay={
                            (date: any) => {
                                console.log(date)
                                setSelectedDate(date)
                            }
                        }
                            endDate={100}
                            selectDate={
                                selectedDate
                            }
                            labelFormat={"MMMM"}
                            color={"rgb(248, 68, 100)"}
                        />
                    </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='screens w-[90%] bg-white p-[20px] rounded-lg shadow-md my-5 mx-auto'>
                            {
                                theatres.map((screen, index) => {
                                    let screenid = screen._id
                                    return (
                                        <div className='screen  flex justify-between items-center my-2 p-[10px] cursor-pointer transition-all duration-300 
                                        ease-linear border-b border-b-gray-200' key={index}>
                                            <div>
                                                <h2  className="text-xl font-semibold">{screen.name}</h2>
                                                <h3 className="text-lg font-semibold">{screen.location}</h3>
                                            </div>

                                            <Link  className="border-b-0 mr-[20px] text-white no-underline bg-red-500 bg-opacity-90
                                             border-none rounded-md px-2.5 py-1.5"  href={`${pathname}/${screenid}?date=${selectedDate}`} >Select</Link>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default BuyTicketsPage 