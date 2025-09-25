"use client";

import { axiosInstance } from "@/library/helper";
import React, { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const phone = phoneRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();

        if (!name || !email || !phone || !password || !confirmPassword) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordValid(false);
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        } else {
            setConfirmPasswordValid(true);
        }

        const data = { name, email, phone, password };
        // console.log("data", data);
        

        try {
            const res = await axiosInstance.post("/user/register", data);
            if (res.data.flag === 1) {
                toast.success(res.data.message);
                e.target.reset();
                router.push("/login")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Internal Server Error");
            // console.log(error.message);
            
        }

        setLoading(false);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="w-[400px] bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-4">
                <h1 className="text-gray-800 text-3xl font-semibold mb-2">Create an Account</h1>
                <p className="text-gray-500 text-sm mb-4">Sign up to start your journey</p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
                        <FaUser className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            name="name"
                            ref={nameRef}
                            className="w-full focus:outline-none"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
                        <FaEnvelope className="text-gray-500 mr-3" />
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            className="w-full focus:outline-none"
                            placeholder="Email"
                        />
                    </div>

                    <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-4">
                        <FaPhone className="text-gray-500 mr-3" />
                        <input
                            type="tel"
                            name="phone"
                            ref={phoneRef}
                            className="w-full focus:outline-none"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="w-full flex items-center border border-gray-300 rounded-lg p-3 mb-2">
                        <FaLock className="text-gray-500 mr-3" />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            ref={passwordRef}
                            className="w-full focus:outline-none"
                            placeholder="Password"
                        />
                        {passwordVisible ? (
                            <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500" />
                        ) : (
                            <FaEye onClick={togglePasswordVisibility} className="cursor-pointer text-gray-500" />
                        )}
                    </div>

                    <div className="w-full flex items-center border border-gray-300 rounded-lg p-3">
                        <FaLock className="text-gray-500 mr-3" />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="confirm_password"
                            ref={confirmPasswordRef}
                            className="w-full focus:outline-none"
                            placeholder="Confirm Password"
                        />
                    </div>
                    {!confirmPasswordValid && <span className="text-red-400">Passwords do not match</span>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full text-white font-medium p-3 rounded-lg transition duration-300 ease-in-out 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-gray-500 text-sm mt-3">
                    Already have an account?{" "}
                    <Link href="/website/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
