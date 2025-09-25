"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function RangeSelect() {
    const pathname = usePathname()
    
    const router = useRouter()
    const [range, setRange] = useState({ min: 2000, max: 30000 })
    const changeHandler = (data) => {
        setRange({ min: data[0], max: data[1] })
    }

    useEffect(
        ()=>{
            const url = new URL(window.location.href)
            const min = url.searchParams.get("min")
            const max = url.searchParams.get("max")
            if(min != null && max != null){
                setRange({ min: Number(min), max: Number(max) })
            }
        },[]
    )

    const applyPriceRange = () => {
        const url = new URL(window.location.href)
        url.searchParams.set("min", range.min)
        url.searchParams.set("max", range.max)
        router.push(url.toString())
    }
    return (
        <div className="mb-4 bg-gray-100 p-2 rounded-lg">
            <div className='mb-4 p-2'>
                <label className=" font-semibold text-[18px] block mb-2 text-gray-800">Price Range</label>
                <div className="flex items-center justify-between mb-6 text-gray-700">
                    <div className='p-2'>
                        <h3 className='font-bold mb-2'>Min <FaAngleDown className='inline' /> </h3>
                        <span className="text-gray-700 p-1 border-[2px] border-black rounded-md">₹ {range.min}</span>
                    </div>
                    <div className='p-2'>
                        <h3 className='font-bold mb-2'>Max <FaAngleDown className='inline' /></h3>
                        <span className="text-gray-700 p-1 border-[2px] border-black rounded-md">₹ {range.max}</span>
                    </div>
                </div>
                <RangeSlider onInput={(data) => changeHandler(data)} min={100} max={100000} value={[range.min, range.max]} />
                <div className='text-end'>
                    <button onClick={applyPriceRange} className='p-2 rounded-lg bg-blue-500 text-white mt-5 px-4'>Apply</button>
                </div>
            </div>
        </div>
    )
}
