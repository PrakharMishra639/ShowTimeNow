"use client"
import React from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

const LocationPopup = ( {
    setShowLocationPopup
}: {
    setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [cities, setCities] = React.useState<any[]>([])
    const [selectedCity, setSelectedCity] = React.useState<any>(null)

    const getcities = async () => {
        const indianCities = [
            "Jabalpur",
            "Mumbai",
            "Delhi",
            "Bangalore",
            "Hyderabad",
            "Chennai",
            "Kolkata",
            "Pune",
            "Ahmedabad",
            "Jaipur",
            "Surat",
            "Lucknow",
            "Kanpur",
            "Nagpur",
            "Indore",
            "Thane",
            "Bhopal",
            "Visakhapatnam",
            "Pimpri-Chinchwad",
            "Patna",
            "Vadodara"
        ];

        const cities = indianCities.map((city) => {
            return {
                label: city,
                value: city
            }

        })

        setCities(cities)
    }

    React.useEffect(() => {
        getcities()
    }, [])
    const handleSave = () => {
        // setShowLocationPopup(false)
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/changeCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                city: selectedCity
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    // toast(data.message, {
                    //     type: 'success'
                    // })
                    setShowLocationPopup(false)
                    window.location.reload()
                }
            })
            .catch((err) => {
                toast(err.message, {
                    type: 'error'
                })
                console.log(err)
            })
    }


  return (

   
    <div className='popup-bg rounded-lg'>
    <div className='popup-cont rounded-lg relative'>
    
        <select
            className='city-select peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            onChange={(e) => {
                setSelectedCity(e.target.value)
            }}
        >
            <option value="" disabled selected>Select your city</option>
            {
                cities.map((city: any) => {
                    return <option key={city.value} value={city.value}>{city.label}</option>
                })
            }
        </select>
        <label
    htmlFor="city-select"
    className="absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm"
  >
    Select your city
  </label>

        <button className=' rounded-lg btn px-[10px] py-[5x] text-white bg-rose-500'
            onClick={handleSave}
        >Save</button>
    </div>
</div>

    

  

  )
}

export default LocationPopup