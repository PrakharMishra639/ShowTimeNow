"use client";
import React from "react";

interface Booking {
  _id: string;
  movieId: string;
  screenId: string;
  seats: { seat_id: string }[];
  totalPrice: number;
  paymentType: string;
  paymentId: string;
  showDate: string;
  showTime: string;
}

interface User {
  name: string;
  email: string;
  city?: string;
}

const ProfilePage: React.FC = () => {
  const [bookings, setBookings] = React.useState<Booking[] | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  const getBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/getuserbookings`,
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
        setBookings(data.data as Booking[]);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`,
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
        setUser(data.data as User);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getBookings();
    getUserData();
  }, []);

  return (
    <div className="profile max-w-[800px] mx-auto p-6 flex flex-col gap-6 items-center bg-gray-50 rounded-lg shadow-lg">
      <h1 className="head text-center w-full text-[rgb(248,68,100)] font-bold text-3xl">
        Profile
      </h1>

      <div className="user bg-white rounded-lg shadow-md p-5 w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Details</h2>
        <div className="details flex flex-col gap-4">
          <div className="detail flex justify-between p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-600">Name:</h3>
            <p className="text-gray-800">{user?.name}</p>
          </div>
          <div className="detail flex justify-between p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-600">Email:</h3>
            <p className="text-gray-800">{user?.email}</p>
          </div>
          <div className="detail flex justify-between p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-600">City:</h3>
            <p className="text-gray-800">{user?.city || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="bookings mt-5 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Bookings</h2>
        <div className="details flex flex-wrap gap-4 w-full justify-center">
          {bookings?.map((booking) => (
            <div
              className="booking my-5 border border-gray-300 rounded-md bg-white shadow-md p-4 w-full sm:max-w-[400px]"
              key={booking._id}
            >
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Movie:</h3>
                <p className="text-gray-800">{booking.movieId}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Screen:</h3>
                <p className="text-gray-800">{booking.screenId}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Seats:</h3>
                <p className="text-gray-800">
                  {booking.seats
                    .map((seat) => seat.seat_id)
                    .join(", ")}
                </p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Price:</h3>
                <p className="text-gray-800">{booking.totalPrice}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">
                  Payment Type:
                </h3>
                <p className="text-gray-800">{booking.paymentType}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">
                  Payment Id:
                </h3>
                <p className="text-gray-800">{booking.paymentId}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Show Date:</h3>
                <p className="text-gray-800">{booking.showDate}</p>
              </div>
              <div className="detail flex items-center mb-3">
                <h3 className="mr-2 text-[rgb(248,68,100)] font-medium">Show Time:</h3>
                <p className="text-gray-800">{booking.showTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
