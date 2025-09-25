"use client";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/library/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderPlaced = () => {
  const user = useSelector((store) => store.user);
  const params = useParams();
  const order_id = params?.order_id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.data?._id && order_id) {      
      axiosInstance.get(`/order/${user.data._id}/${order_id}`)
        .then((response) => {
          setOrder(response.data?.order || null);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          toast.error("Failed to fetch order details");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.data?._id, order_id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg">
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-3 text-lg">Thank you for your purchase. Your order has been confirmed.</p>

        {/* Order Details */}
        {loading ? (
          <p className="text-gray-600 mt-6 text-lg animate-pulse">Loading order details...</p>
        ) : order ? (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg text-left shadow-md">
            <p className="text-gray-800 text-lg"><span className="font-semibold">Order ID:</span> {order_id}</p>
            <p className="text-gray-800 text-lg"><span className="font-semibold">Payment Method:</span> {order.payment_method === 1 ? "Razorpay" : "Cash On Delivery"}</p>
            <p className="text-gray-800 text-lg"><span className="font-semibold">Total Amount:</span> ₹{order.final_total || "N/A"}</p>
          </div>
        ) : (
          <p className="text-red-500 mt-6 text-lg">Failed to load order details.</p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href={"/profile"}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            View Order
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={"/receipt/" + order_id}
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition-all"
            >
              Order Receipt
            </Link>
            <Link
              href={"/store"}
              className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-100 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
