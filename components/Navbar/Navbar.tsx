"use client"
import Link from 'next/link'
import React from 'react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import LocationPopup from '@/popups/location/LocationPopup'

const Navbar = () => {
  const[showLocationPopup, setShowLocationPopup] = React.useState<boolean>(false);
   const [user, setUser] =React.useState<any>(null)
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
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
            setLoggedIn(true)
            }
            else{
              setLoggedIn(false);
            
            }
        })
        .catch((error) => {
            console.log(error)
        })

}


const handleLogout = async () => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
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
          if (response.ok) {
              window.location.href = "/auth/signin"
          }

      })
      .catch((error) => {
          console.log(error)
          window.location.href = "/auth/signin"

      })
}
React.useEffect(() => {
  getuser()
}, [])

  return (
    <nav className='flex text-white bg-slate-800 justify-between items-center px-[10px] py-[10px] '>
        <div className="left flex items-center">
           <Link href="/">
           <Image className='h-[50px] mr-[10px]' src={logo} alt="logo" width={180} height={100} />
           </Link>
          <div className="searchbox flex items-center bg-white rounded p-[10px] ml-[10px] w-[500px]">
            <BiSearch className='searchbtn mr-[5px] text-lg text-slate-500' />
            <input className=" border-none outline-none bg-none" type="text" placeholder="Search for a Movie"/>
          </div>
        </div>
        <div className="right flex items-center justify-end">
           <p className='dropdown  flex items-center mx-0 my-[20px] cursor-pointer'
           onClick={() => setShowLocationPopup(true)}> {user ? user.city : "Select City"} <RiArrowDropDownFill className='dropicon text-sm'/></p>
            {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone items-center bg-red-500 bg-opacity-90 mx-3  px-3 py-1 rounded-sm border-none' onClick={handleLogout}>Logout</button>
                     :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone items-center bg-red-500 bg-opacity-90 mx-3  px-3 py-1 rounded-sm border-none'>
                            Login
                        </Link>

               }
           <Link href="/profile" className=" mx-5">
           <BiUserCircle className='text-xl'/>
           </Link>
        </div>
        {
          showLocationPopup && 
          <LocationPopup
            setShowLocationPopup={setShowLocationPopup}
          />
        }
    </nav>
  )
}

export default Navbar