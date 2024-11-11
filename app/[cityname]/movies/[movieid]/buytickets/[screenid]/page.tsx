"use client"
import React from 'react'

import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SelectSeatPage  = () => {

    const pathname = usePathname()
    const params = useParams()
    const searchParams = useSearchParams()

    const date = searchParams.get('date')
    const { movieid, cityname, screenid } = params
    console.log(movieid, cityname, screenid)




    const [screen, setScreen] = React.useState<any>(null)
    const [selectedTime, setSelectedTime] = React.useState<any>(null)

    const getschedules = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/schedulebymovie/${screenid}/${date}/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    console.log(response.data)
                    setScreen(response.data)
                    setSelectedTime(response.data.movieSchedulesforDate[0])
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))

    }

    const [movie, setMovie] = React.useState<any>(null)


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
                    console.log('movie', data.data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getschedules()
        getMovie()
    }, [])


    const [selectedSeats, setSelectedSeats] = React.useState<any[]>([])




    const selectdeselectseat = (seat: any) => {
        console.log(seat)
        // {
        //     "row": "F",
        //     "col": 1,
        //     "seat_id": "6",
        //     "price": 500
        // }
        const isselected = selectedSeats.find((s: any) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ))

        if (isselected) {
            setSelectedSeats(selectedSeats.filter((s: any) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )))
        }

        else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }


    const generateSeatLayout = () => {
        const x = screen.movieSchedulesforDate.findIndex((t: any) => t.showTime === selectedTime.showTime)
     
        let notavailableseats = screen.movieSchedulesforDate[x].notAvailableSeats


        return (
            <div>
                {screen.screen.seats.map((seatType, index) => (
                    <div className="seat-type m-[10px] px-[20px] py-[10px] bg-[#ffffff]" key={index}>
                        <h2  className="text-sm mb-[10px] font-normal border
                         border-gray-300 w-max px-5 py-1.5 rounded-full">{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows.map((row, rowIndex) => (
                                <div className="seat-row m-[2px] flex items-center
                                 justify-between gap-5" key={rowIndex}>
                                    <p className="rowname  w-[30px] h-[30px] flex justify-center items-center rounded-full bg-rose-500
                                     text-white text-[12px] font-medium p-0 leading-none">{row.rowname}</p>
                                    <div className="seat-col flex justify-between w-[100%] gap-[50px]">
                                        {row.cols.map((col, colIndex) => (


                                            <div className="seat-col flex" key={colIndex}>
                                                {col.seats.map((seat, seatIndex) => (
                                                    // console.log(seat),

                                                    <div key={seatIndex}>
                                                        {
                                                           notavailableseats.find((s: any) => (
                                                                s.row === row.rowname &&
                                                                s.seat_id === seat.seat_id &&
                                                                s.col === colIndex
                                                            )) ?
                                                                <span className='seat-unavailable rounded-md  w-[30px] justify-center items-center mr-[5px] px-[10px] py-[4px]   h-[30px] !bg-gray-300 !text-white cursor-not-allowed'>
                                                                    {seatIndex + 1}
                                                                </span>
                                                                :
                                                                <span   className={`w-[30px] h-[30px] flex justify-center items-center mr-[5px] bg-white rounded-md shadow-[0px_0px_5px_0px_#ccc] hover:cursor-pointer hover:bg-rose-500 hover:text-white
                                                                    ${selectedSeats.find(
                                                                      (s: any) =>
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                    )
                                                                      ? 'seat-selected !bg-rose-500 !text-white'
                                                                      : 'seat-available'}`}
                                                                    onClick={() => selectdeselectseat({
                                                                        row: row.rowname,
                                                                        col: colIndex,
                                                                        seat_id: seat.seat_id,
                                                                        price: seatType.price
                                                                    })}
                                                                >
                                                                    {seatIndex + 1}
                                                                </span>

                                                        }
                                                    </div>
                                                    // <div key={seatIndex}>
                                                    //     {seat.status === 'available' &&
                                                    //         <span className={
                                                    //             selectedSeats.find((s: any) => (
                                                    //                 s.row === row.rowname &&
                                                    //                 s.seat_id === seat.seat_id &&
                                                    //                 s.col === colIndex
                                                    //             )) ? "seat-selected" : "seat-available"
                                                    //         }
                                                    //         onClick={() => selectdeselectseat({
                                                    //             row: row.rowname,
                                                    //             col: colIndex,
                                                    //             seat_id: seat.seat_id,
                                                    //             price: seatType.price
                                                    //         })}
                                                    //     >
                                                    //         {seatIndex + 1}
                                                    //     </span>
                                                    //     }
                                                    //     {seat.status === 'not-available' &&
                                                    //         <span className="seat-unavailable">
                                                    //             {seatIndex + 1}
                                                    //         </span>
                                                    //     }
                                                    // </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <br /> <br /> <br />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const handleBooking = () => {


        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/bookticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                showTime: selectedTime.showTime,
                showDate: date,
                movieId: movieid,
                screenId: screenid,
                seats: selectedSeats,
                totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                paymentId: '123456789',
                paymentType: 'online'
            })

        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    toast.success('Booking Successful')
                    console.log(response)
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='selectseatpage bg-rose-500 min-h-[100vh] w-full'>
            {
                movie && screen &&
                <div className='s1 bg-white'>
                    <div className='head bg-slate-800 p-[10px]'>
                        <h1 className="text-white text-2xl font-semibold">{movie.title} - {screen?.screen?.name}</h1>
                        <h3  className="text-gray-500 font-semibold text-sm border border-gray-600
                         py-[5px] px-[20px] rounded-3xl w-fit">{movie.genre.join(" / ")}</h3>
                    </div>
                </div>
            }

            {
                screen &&
                <div className="selectseat  flex flex-col items-center bg-white">
                    <div className='timecont flex justify-center items-center gap-2 m-5'>
                        {
                            screen.movieSchedulesforDate.map((time: any, index: number) => (
                                <h3 className={selectedTime?._id === time._id ? 'time selected px-2 py-1 rounded-lg border-2 border-[rgb(248,68,100)] text-[rgb(248,68,100)]' : 'time border-2 border-gray-300 px-5 py-1 rounded-full text-xs font-normal cursor-pointer'} 

                                onClick={() => {
                                    setSelectedTime(time)
                                    setSelectedSeats([])
                                }} key={index}>
                                    {time.showTime}
                                </h3>
                            ))
                        }
                    </div>
                    <div className='indicators flex flex-row items-center gap-[10px]'>
                        <div className="flex flex-row items-center gap-[10px]">
                            <span className='seat-unavailable flex w-[20px] h-[20px] rounded-full justify-center items-center text-sm font-semibold 
                            text-[#313131] bg-[rgb(230,230,230)] border p-0 m-0'></span>
                            <p className="text-sm font-semibold text-gray-500 p-0 m-0">Not available</p>
                        </div>
                        <div className="flex flex-row items-center gap-[10px]">
                            <span className='seat-available flex w-[20px] h-[20px] rounded-full justify-center items-center text-sm 
                            font-semibold text-white border p-0 m-0'></span>
                            <p className="text-sm font-semibold text-gray-500 p-0 m-0">Available</p>
                        </div>
                        <div className="flex flex-row items-center gap-[10px]">
                            <span className='seat-selected flex w-[20px] h-[20px] rounded-full justify-center items-center text-sm font-semibold
                             text-white border p-0 m-0  bg-rose-400'></span>
                            <p  className="text-sm font-semibold text-gray-500 p-0 m-0">Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}


                    <div className='totalcont flex flex-row items-center justify-between p-5 bg-white m-5 rounded-lg shadow w-72'>
                        <div className='total flex justify-center gap-4 items-center'>
                            <h2 className="text-[15px] font-semibold text-gray-500">Total</h2>
                            <h3 className="text-[15px] font-semibold text-rose-500">Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>

                        {/* <Link href="/" className='theme_btn1 linkstylenone'>Continue</Link> */}
                        <button
                            className='theme_btn1 linkstylenone bg-[rgb(248,68,100)] text-white border-none rounded px-2 py-1 no-underline mr-2 '
                            onClick={handleBooking}
                        >Book Now</button>
                    </div>
                </div>
            }
            {/* 

            <div className="selectseat">
            
               
                
              
            </div> */}
        </div>
    )
}

export default SelectSeatPage 