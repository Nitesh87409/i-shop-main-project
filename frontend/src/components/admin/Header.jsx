"use client";


import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { adminlogout } from '@/redux/slices/AdminSlice';
import { useRouter } from 'next/navigation';


const Header = () => {

    const router = useRouter()
    const admin = useSelector((store) => store.admin);
    const dispatch = useDispatch();

    const handlelogout=() => {
      dispatch(adminlogout())
      router.push("/admin/login")

    }

    return (
        <header className="bg-gray-100 antialiased text-black p-4 flex justify-between items-center ">
            <div className="flex items-center">
                <FaUserCircle className="text-3xl mr-2" />
                {admin?.data?.name && <h1 className="text-2xl font-bold">Hii ,{admin?.data.name}</h1>}
            </div>
            <button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handlelogout}>
                <AiOutlineLogout className="mr-2" />
                Logout
            </button>
        </header>
    );
};

export default Header;