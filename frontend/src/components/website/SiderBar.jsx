"use client";

import React, { useState } from 'react';
import ColorSelect from '@/components/website/ColorSelect';
import RangeSelect from '@/components/website/RangeSelect';
import Link from 'next/link';
import { FaFilter, FaTimes } from 'react-icons/fa';

export default function SiderBar({ getCategory, Colors }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            {/* Sidebar Toggle Button (Visible on Mobile/Tablet) */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-4 rounded-full shadow-md"
                onClick={() => setIsSidebarOpen(true)} // Open Sidebar
            >
                <FaFilter />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-74 bg-white shadow-lg z-40 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:col-span-1`}
            >
                <div className="sticky top-0 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 p-4">
                    {/* Close Button (Visible on Mobile/Tablet) */}
                    <button
                        className="lg:hidden absolute top-7 right-6 text-red-500 text-2xl"
                        onClick={() => setIsSidebarOpen(false)} // Close Sidebar
                    >
                        <FaTimes />
                    </button>

                    <h2 className="bg-gray-100 p-3 rounded-lg flex items-center text-lg font-semibold mb-4 shadow-sm !text-blue-500">
                        <FaFilter className="mr-2 " /> Filters
                    </h2>

                    {/* Category Filter */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4 shadow-sm">
                        <label className="font-semibold text-[16px] p-2 block text-gray-800">Category</label>
                        <div className="p-2">
                            <Link href={"/store"} className="text-[14px] font-semibold p-2 text-blue-500 hover:underline">
                                ALL
                            </Link>
                            {getCategory.map((category, index) => (
                                <ul
                                    key={index}
                                    className="first-letter:uppercase flex justify-between items-center p-2 text-[14px] font-semibold text-gray-600 hover:text-blue-500"
                                >
                                    <Link href={`/store/${category.slug}`}>
                                        <li>{category.name}</li>
                                    </Link>
                                    <span className="text-gray-400">({category.ProductCount})</span>
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/* Color Filter */}
                    <ColorSelect colors={Colors ?? []} />

                    {/* Price Range Filter */}
                    <RangeSelect />

                    <div className="text-end mt-4">
                        <a
                            href={"/store"}
                            className="bg-red-500 text-white rounded-lg px-4 py-2 font-semibold shadow-md hover:bg-red-600 transition"
                        >
                            Reset
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}