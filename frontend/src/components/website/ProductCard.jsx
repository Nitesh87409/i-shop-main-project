import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CartBtn from "./CartBtn";

export default function ProductCard({ _id, name, stock, color, original_price, discounted_price, discount_percentage, main_image, viewMode ,category}) {
    return (
        <div className={`col-span-2 ${viewMode == "list" ? "md:col-span-2" : "md:col-span-1 hover:scale-105 "} bg-white rounded-lg border border-gray-200 shadow-md  p-4 transition-transform transform `}>
            {/* Product Image */}
        <div>
                <div className="flex justify-center">
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${main_image}`}
                    alt={name}
                    className={`${viewMode == "list" ? "h-[230px]" : "h-[170px]"} object-contain`}
                />
            </div>

            {/* Product Title */}
            <h2 className="text-center font-semibold text-lg mt-4 text-gray-800 truncate">{name}</h2>

            {/* Rating */}
            <div className="flex justify-center items-center mt-2 text-yellow-500 space-x-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <FaRegStar />
            </div>
            <div className="flex justify-center flex-col items-center mt-2 space-x-1">
            {viewMode == "list" && <span className="text-green-500 text-sm">{stock} in stock</span>
            }
             {viewMode == "list" && <span className="text-black text-sm font-bold">Category-{category.name} </span>
            }
            </div>

            {/* Pricing */}
            <div className="mt-4 text-center">
                
                <span className="text-gray-800 font-bold text-xl mr-2">₹ {discounted_price}</span>
                <span className="text-red-500 font-medium">{discount_percentage}% OFF</span>
                <br />
                <span className="text-gray-500 line-through text-sm">₹ {original_price}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <CartBtn prices={{ discounted_price, original_price }} product_id={_id} colors={color} />
                <button className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition">
                    <FaHeart className="text-red-500 text-lg" />
                </button>
            </div>
        </div>
        </div>
    );
}