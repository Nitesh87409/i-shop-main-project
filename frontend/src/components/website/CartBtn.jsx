"use client"
import React, { useState, useEffect } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/CartSlice';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/library/helper';

export default function CartBtn({ prices, product_id, colors }) {
    const user = useSelector(store => store.user)
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showPopup]);

    const CartHandler = (color_id) => {
        if (user.data == null) {
            toast.error("Login First")
        } else {
            axiosInstance.post("/cart/addcart" ,{user_id:user.data._id , product_id, color_id})
            .then(
                (response) =>{
                    if(response.data.flag == 1){
                        toast.success(response.data.message)
                        dispatch(addToCart({ product_id, color_id, prices }))
                    }
                }
            ).catch(
                (error)=>{
                    toast.error(response.data.message)
                }
            )
            setShowPopup(false)
        }
    };


    return (
        <div className="relative">
            <button className="bg-blue-500 text-white rounded self-center px-4 py-2" onClick={() => setShowPopup(true)}>
                <FaCartShopping />
            </button>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-80 border border-gray-300 relative">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-md font-semibold">Select Color</h3>
                            <button onClick={() => setShowPopup(false)} className="text-red-500">
                                <FaTimes />
                            </button>
                        </div>
                        <ul>
                            {colors.map((color, index) => (
                                <li key={index} className="flex justify-between items-center p-2 border-b last:border-none">
                                    <button onClick={() => CartHandler(color._id)} style={{ background: color.code }} className={`px-4 py-2 inline-block ${color.name == 'White' ? 'text-black' : 'text-white' } rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg text-md`}>
                                        {color.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
