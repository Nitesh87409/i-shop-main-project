"use client";

import { axiosInstance } from "@/library/helper";
import { adminlogin } from "@/redux/slices/AdminSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // Importing icons
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const data = { email, password };

    await axiosInstance.post("/admin/login", data)
      .then((res) => {
        if (res.data.flag === 1) {
          toast.success(res.data.message);
          dispatch(adminlogin({ admin: res.data.admin, token: res.data.token }))
          localStorage.setItem("admin", JSON.stringify(res.data.admin))
          localStorage.setItem("admin_token", res.data.token)
          localStorage.setItem("admin_timestamp", new Date().getTime())
          router.push("/admin")
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error");
      });

    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-[400px] bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-4">
        <h1 className="text-gray-800 text-3xl font-semibold mb-2">Welcome Admin</h1>
        <p className="text-gray-500 text-sm mb-4">Login to your account</p>

        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Username Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="w-full focus:outline-none !text-black"
              placeholder="Admin Email"
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className="w-full focus:outline-none  !text-black"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Link to Sign Up page */}
        <p className="text-gray-500 text-sm mt-3">
          Don't have an account? <Link href="/admin/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
