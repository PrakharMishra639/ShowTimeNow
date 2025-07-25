"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import logo from "@/assets/logo.png";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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

    // Validate inputs
    const validationErrors: Record<string, string> = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors

    // Perform login
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const response = await res.json();

      if (response.ok) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 2000,
        });
        window.location.href = "/";
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="authout mb-8">
      <div className="authin flex w-[900px] min-h-[400px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] mt-[50px] rounded-lg overflow-hidden bg-white">
        <div className="left w-[40%] bg-black overflow-hidden flex justify-center items-center">
          <Image src={logo} alt="Logo" className="img" />
        </div>
        <div className="right w-[60%] p-[20px]">
          <form className="w-[100%] flex flex-col" onSubmit={handleSubmit}>
            <div className="forminput_cont flex flex-col my-[10px] mx-0 gap-[10px] w-[100%] relative">
              <label className="text-xl text-[#f84464]">Email</label>
              <input
                type="text"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border-b-[1px] border-b-[#f84464] p-[10px] text-sm w-auto"
              />
              {errors.email && (
                <span className="formerror text-[#ff0000]">{errors.email}</span>
              )}
            </div>
            <div className="forminput_cont flex flex-col my-[10px] mx-0 gap-[10px] w-[100%] relative">
              <label className="text-xl text-[#f84464]">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white border-b-[1px] border-b-[#f84464] p-[10px] text-sm w-auto"
              />
              {errors.password && (
                <span className="formerror text-[#ff0000]">
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="main_button bg-white text-[#f84464] font-semibold py-[15px] px-[32px] text-center text-lg border-none border-b-[1px] border-[#f84464] w-fit mx-auto my-[10px]"
            >
              Login
            </button>
            <p className="authlink text-center my-[10px] text-[#333444]">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#f84464] text-lg font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
