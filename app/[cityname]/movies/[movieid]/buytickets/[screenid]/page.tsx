"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface Seat {
  row: string;
  col: number;
  seat_id: string;
  price: number;
}

interface SeatType {
  type: string;
  price: number;
  rows: {
    rowname: string;
    cols: {
      seats: { seat_id: string }[];
    }[];
  }[];
}

interface Screen {
  screen: {
    name: string;
    seats: SeatType[];
  };
  movieSchedulesforDate: {
    _id: string;
    showTime: string;
    notAvailableSeats: Seat[];
  }[];
}

interface Movie {
  title: string;
  genre: string[];
}

const SelectSeatPage = () => {
  const { movieid, screenid } = useParams();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const [screen, setScreen] = useState<Screen | null>(null);
  const [selectedTime, setSelectedTime] = useState<Screen["movieSchedulesforDate"][0] | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/schedulebymovie/${screenid}/${date}/${movieid}`,
        { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" }
      );
      const data = await response.json();
      if (data.ok) {
        setScreen(data.data);
        setSelectedTime(data.data.movieSchedulesforDate[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`,
        { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" }
      );
      const data = await response.json();
      if (data.ok) {
        setMovie(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchMovie();
  }, [movieid, screenid, date]);

  const toggleSeatSelection = (seat: Seat) => {
    const isSelected = selectedSeats.some(
      (s) => s.row === seat.row && s.col === seat.col && s.seat_id === seat.seat_id
    );
    if (isSelected) {
      setSelectedSeats((prev) =>
        prev.filter((s) => s.row !== seat.row || s.col !== seat.col || s.seat_id !== seat.seat_id)
      );
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/bookticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          showTime: selectedTime?.showTime,
          showDate: date,
          movieId: movieid,
          screenId: screenid,
          seats: selectedSeats,
          totalPrice: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
          paymentId: "123456789",
          paymentType: "online",
        }),
      });
      const data = await response.json();
      if (data.ok) {
        toast.success("Booking Successful");
      } else {
        toast.error("Booking Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking.");
    }
  };

  const renderSeatLayout = () => {
    if (!screen || !selectedTime) return null;
    const unavailableSeats = screen.movieSchedulesforDate.find(
      (schedule) => schedule.showTime === selectedTime.showTime
    )?.notAvailableSeats;

    return screen.screen.seats.map((seatType, index) => (
      <div key={index} className="mb-6 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          {seatType.type} - Rs. {seatType.price}
        </h2>
        {seatType.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-2">
            <span className="inline-block w-8 h-8 bg-rose-500 text-white font-bold text-center rounded-full">
              {row.rowname}
            </span>
            <div className="flex gap-2 ml-4">
              {row.cols.map((col, colIndex) => (
                <div key={colIndex} className="flex gap-1">
                  {col.seats.map((seat, seatIndex) => {
                    const isUnavailable = unavailableSeats?.some(
                      (unavailableSeat) =>
                        unavailableSeat.row === row.rowname &&
                        unavailableSeat.col === colIndex &&
                        unavailableSeat.seat_id === seat.seat_id
                    );
                    const isSelected = selectedSeats.some(
                      (s) => s.row === row.rowname && s.col === colIndex && s.seat_id === seat.seat_id
                    );
                    return (
                      <button
                        key={seatIndex}
                        className={`w-8 h-8 text-center rounded-md ${
                          isUnavailable
                            ? "bg-gray-400 cursor-not-allowed"
                            : isSelected
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          !isUnavailable &&
                          toggleSeatSelection({
                            row: row.rowname,
                            col: colIndex,
                            seat_id: seat.seat_id,
                            price: seatType.price,
                          })
                        }
                      >
                        {seatIndex + 1}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="p-6">
      {movie && screen && (
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <h3 className="text-lg text-gray-600">{screen.screen.name}</h3>
        </header>
      )}
      <section className="bg-gray-100 p-4 rounded-md">
        {renderSeatLayout()}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">
            Total: Rs. {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SelectSeatPage;

