"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoGrid } from "react-icons/io5";
import { IoReorderThree } from "react-icons/io5";

export default function ItemsHeader({pro_length}) {
    const [productView, setProductView] = useState("grid");

    const router = useRouter();
    const searchParams = useSearchParams();

    const toggleHandler = (value) => {
        setToggle(value);
    };


    useEffect(() => {
        const viewVal = searchParams.get("view");
        if (viewVal) setProductView(viewVal);
    }, [searchParams]);

    const updateSearchParams = (key, value) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
        router.push(url.toString());
    };

    return (
        <div className='col-span-2 flex items-center justify-between flex-col md:flex-row shadow-md rounded p-4 px-7 !text-gray-500'>
            <div className='flex gap-5 items-center font-bold'>
                <div>{pro_length} Items</div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='text-[14px]'>Sort By</div>
                    <select className='border border-gray-300 rounded-md p-2'>
                        <option value="">Name</option>
                        <option value="" >Lowest Price</option>
                        <option value="" >Highest Price</option>
                    </select>
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='text-[14px]'>Show</div>
                    <select className='border border-gray-300 rounded-md p-2'>
                        <option value="">12</option>
                        <option value="">24</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <IoGrid onClick={()=> updateSearchParams("view", "grid")} className={`text-xl cursor-pointer ${productView === "grid" ? "text-blue-600" : "text-gray-400"}`} />
                <IoReorderThree onClick={()=> updateSearchParams("view", "list")} className={`text-3xl cursor-pointer  ${productView === "list" ? "text-blue-600" : "text-gray-400"}`} />
            </div>
        </div>
    )
}