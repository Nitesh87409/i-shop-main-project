"use client";

import { axiosInstance } from "@/library/helper";
import { dbToCart } from "@/redux/slices/CartSlice";
import { login } from "@/redux/slices/UserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // Importing icons
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function LoginPage() {
  // State to manage loading state
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef(); // Reference for email input
  const passwordRef = useRef(); // Reference for password input
  const dispatch = useDispatch(); // Redux dispatch function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Validate input fields
    if (!email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const data = { email, password };

    // Send login request to the server
    await axiosInstance.post("/user/login", data)
      .then((res) => {
        if (res.data.flag === 1) {
          // If login is successful, fetch user data and cart
          const cart = res.data.user.cart;

        
          let original_total = 0;
          let final_total = 0;

          if (cart.length > 0) {
            // Calculate original and final totals and prepare cart data
            const cartData = cart.map((c, i) => {
              original_total += c.product_id.original_price * c.quantity;
              final_total += c.product_id.discounted_price * c.quantity;
              return { product_id: c.product_id._id, color_id: c.color_id, quantity: c.quantity };
            });
            // Dispatch cart data to Redux store
            dispatch(dbToCart({ items: cartData, original_total, final_total }));
          }
          toast.success(res.data.message);
          // Dispatch user data to Redux store
          dispatch(login({ user: res.data.user }));
          // Store user data in local storage
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // console.log(res.data.user);
          
          localStorage.setItem("user_timestamp", new Date().getTime());
          // Redirect to home page
          router.push("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error", err.message);
      });

    setLoading(false);
  };

  

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 ">
      <div className="w-[400px] bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-4">
        <h1 className="text-gray-800 text-3xl font-semibold mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-4">Login to your account</p>

        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="w-full ">
          {/* Email Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="w-full focus:outline-none text-black"
              placeholder="User Email"
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
            <FaLock className="text-gray-800 mr-3" />
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className="w-full focus:outline-none text-gray-800"
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
          Don't have an account? <Link href="/website/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
