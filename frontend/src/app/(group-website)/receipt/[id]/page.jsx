"use client";
import { axiosInstance } from "@/library/helper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Receipt() {
  const user = useSelector(store => store.user);
  const params = useParams();
  const order_id = params?.id;
  const [order, setOrder] = useState(null);

  const paymentMethods = {
    0: "Cash on Delivery",
    1: "Razorpay",
  };

  const orderStages = [
    "Waiting for Payment",
    "Order Placed",
    "Order Packed",
    "Order Dispatched",
    "Order Shipped",
    "Out for Delivery",
    "Delivered",
    "Order Canceled",
  ];

  useEffect(() => {
    if (user?.data && order_id) {
      axiosInstance.get(`/order/${user.data._id}/${order_id}`)
        .then((response) => {
          setOrder(response.data.order);
        })
        .catch(() => {
          toast.error("Failed to fetch order details");
        });
    }
  }, [user, order_id]);

  // Calculate progress based on order status (divide 100% into 7 steps)
  const progress = order?.order_status >= 0 && order?.order_status <= 6
    ? (order.order_status / 6) * 100
    : 0;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-orange-600 uppercase text-center">Ishop Receipt</h2>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">Order ID: {order_id}</h3>
        <p className="text-gray-600">Dear {order?.address?.name || "Customer"},</p>
        <p className="text-gray-600">
          We are writing to inform you that your order placed on {order?.createdAt ? new Date(order.createdAt).toDateString() : "N/A"} has been {order?.order_status === 6 ? "delivered" : "confirmed"}.
          You can track your order by logging into your account.
        </p>
      </div>

      {/* Order Progress Bar */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-black">Order Status</h4>
        <p className="text-gray-700 mb-2">{orderStages[order?.order_status] || "Unknown Status"}</p>
        <div className="w-full bg-gray-200 rounded-full h-3 relative">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Shipping and Billing Addresses */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <h4 className="text-orange-600 font-semibold">Shipping Address</h4>
          <p>{order?.address?.flat}, {order?.address?.street}</p>
          <p>{order?.address?.district}, {order?.address?.state} - {order?.address?.pincode}</p>
          <p>Contact: {order?.address?.contact}</p>
        </div>
        <div>
          <h4 className="text-orange-600 font-semibold">Billing Address</h4>
          <p>{order?.address?.flat}, {order?.address?.street}</p>
          <p>{order?.address?.district}, {order?.address?.state} - {order?.address?.pincode}</p>
          <p>Contact: {order?.address?.contact}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-black">Summary</h4>
        <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex justify-between p-3 bg-orange-500 text-white font-semibold">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
          {Array.isArray(order?.products) && order.products.map((product, index) => (
            <div key={index} className="p-3 border-b border-gray-200 flex justify-between text-gray-600">
              <span>{product.name || "Unknown Product"}</span>
              <span>{product.quantity}</span>
              <span>₹{product.total_price ? product.total_price.toFixed(2) : "0.00"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="mt-4 text-right text-gray-700">
        <p>Sub-Total: <span className="font-semibold">₹{order?.original_total ? order.original_total.toFixed(2) : "0.00"}</span></p>
        <p>Final Total: <span className="font-semibold">₹{order?.final_total ? order.final_total.toFixed(2) : "0.00"}</span></p>
        <p>Payment Method: <span className="font-semibold">{paymentMethods[order?.payment_method] || "Unknown"}</span></p>
        <p className="font-bold text-lg">Total Payable: <span className="text-orange-600">₹{order?.final_total ? order.final_total.toFixed(2) : "0.00"}</span></p>
      </div>
    </div>
  );
}
