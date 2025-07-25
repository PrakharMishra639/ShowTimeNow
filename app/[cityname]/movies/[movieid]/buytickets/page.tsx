"use client";
// @ts-ignore
import React from "react";
import DatePicker from "react-horizontal-datepicker";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

interface Movie {
  title: string;
  language: string;
  genre: string[];
  portraitImgUrl?: string;
  landscapeImgUrl?: string;
  rating?: number;
  duration?: number;
  description?: string;
  [key: string]: any;
}

interface Screen {
  _id: string;
  name: string;
  location: string;
  [key: string]: any;
}

const BuyTicketsPage: React.FC = () => {
  const pathname = usePathname();
  const params = useParams() as { movieid: string; cityname: string };

  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const { movieid, cityname } = params;
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [theatres, setTheatres] = React.useState<Screen[] | null>(null);

  console.log(movieid);

  const getMovie = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data);
        setMovie(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTheatres = async (date: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/screensbymovieschedule/${cityname}/${date}/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data);
        setTheatres(data.data);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getMovie();
  }, []);

  React.useEffect(() => {
    getTheatres(selectedDate);
  }, [selectedDate]);

  return (
    <>
      {movie && (
        <div className="buytickets gray-200 min-h-[100vh] w-full">
          <div className="s1 bg-white">
            <div className="head bg-slate-800 p-[20px]">
              <h1 className="text-white text-4xl font-semibold">
                {movie.title} - {movie.language}
              </h1>
              <h3
                className="text-gray-500 text-sm font-semibold px-[10px] py-[5px]
                             rounded-2xl w-fit border border-gray-500"
              >
                {movie.genre.join(",")}
              </h3>
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

          {theatres && theatres.length > 0 && (
            <div className="screens w-[90%] bg-white p-[20px] rounded-lg shadow-md my-5 mx-auto">
              {theatres.map((screen) => (
                <div
                  className="screen flex justify-between items-center my-2 p-[10px] cursor-pointer transition-all duration-300 \
                                        ease-linear border-b border-b-gray-200"
                  key={screen._id}
                >
                  <div>
                    <h2 className="text-xl font-semibold">{screen.name}</h2>
                    <h3 className="text-lg font-semibold">{screen.location}</h3>
                  </div>

                  <Link
                    className="border-b-0 mr-[20px] text-white no-underline bg-red-500 bg-opacity-90
                                             border-none rounded-md px-2.5 py-1.5"
                    href={`${pathname}/${screen._id}?date=${selectedDate}`}
                  >
                    Select
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BuyTicketsPage;