"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '@/components/Navbar/Navbar';

import Link from 'next/link';
import { toast } from 'react-toastify';
import logo from '@/assets/logo.png';


interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    city: string;
}

export default function Signup() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        console.log(formData)
        setErrors({})

        const validationErrors: Record<string, string> = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.city) {
            validationErrors.city = 'City is required';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                if (response.ok) {
                    toast(response.message, {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 2000
                    })
                    window.location.href = '/auth/signin'
                    setFormData(
                        {
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            city: ''
                        }
                    )
                } else {
                    toast(response.message, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 2000
                    });
                }
            })
            .catch((error) => {
                toast(error.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            })
    }
    return (
        <div className='authout'>
            <div className='authin flex w-[900px] min-h-[400px] mx-auto shadow-[0_0_10px_rgba(0,0,0,0.2)] mt-[50px] rounded-lg overflow-hidden bg-white'>
                <div className="left w-[40%] bg-black overflow-hidden flex justify-center items-center">
                    <Image src={logo} alt="" className='img' />
                </div>
                <div className='right w-[60%] p-[20px]'>
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <div className="forminput_cont flex flex-col my-[10px] gap-[10px] w-[100%] relative">
                            <label className="text-[#f84464]">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-white border-b border-[#f84464] p-[10px] text-sm w-auto focus:outline-none focus:border-b-2 focus:border-[#333444]"
                            />
                            {errors.name && <span className="formerror text-[#ff0000]">{errors.name}</span>}
                        </div>
                        <div className="forminput_cont flex flex-col my-[10px] gap-[10px] w-[100%] relative">
                            <label className="text-[#f84464]">Email</label>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white border-b border-[#f84464] p-[10px] text-sm w-auto focus:outline-none focus:border-b-2 focus:border-[#333444]"
                            />
                            {errors.email && <span className="formerror text-[#ff0000]">{errors.email}</span>}
                        </div>
                        <div className="forminput_cont flex flex-col my-[10px] gap-[10px] w-[100%] relative">
                            <label className="text-[#f84464]">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-white border-b border-[#f84464] p-[10px] text-sm w-auto focus:outline-none focus:border-b-2 focus:border-[#333444]"
                            />
                            {errors.password && (
                                <span className="formerror text-[#ff0000]">{errors.password}</span>
                            )}
                        </div>
                        <div className="forminput_cont flex flex-col my-[10px] gap-[10px] w-[100%] relative">
                            <label className="text-[#f84464]">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Your Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="bg-white border-b border-[#f84464] p-[10px] text-sm w-auto focus:outline-none focus:border-b-2 focus:border-[#333444]"
                            />
                            {errors.confirmPassword && (
                                <span className="formerror text-[#ff0000]">{errors.confirmPassword}</span>
                            )}
                        </div>
                        <div className="forminput_cont flex flex-col my-[10px] gap-[10px] w-[100%] relative">
                            <label className="text-[#f84464]">City</label>
                            <input
                                type="text"
                                placeholder="Enter Your City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="bg-white border-b border-[#f84464] p-[10px] text-sm w-auto focus:outline-none focus:border-b-2 focus:border-[#333444]"
                            />
                            {errors.city && (
                                <span className="formerror text-[#ff0000]">{errors.city}</span>
                            )}
                        </div>
                        <button type="submit" className="main_button bg-white text-[#f84464] font-semibold py-[15px] px-[32px] text-center text-[16px] border-none border-b border-[#f84464] mx-auto my-[10px] hover:bg-[#f84464] hover:text-white transition-all duration-300 rounded-lg">
                            Register
                        </button>
                        <p className='authlink text-[#333444]'>
                            Already have an account? <Link href="/auth/signin" className="text-[#f84464] font-medium">login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
    
}