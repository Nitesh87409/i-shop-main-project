'use client';

import { axiosInstance } from '@/library/helper';
import { emptyCart } from '@/redux/slices/CartSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRazorpay } from "react-razorpay";

const Checkout = () => {
    // const Razorpay = useRazorpay()
    const { error, isLoading, Razorpay } = useRazorpay();
    const [paymentMethod, setPaymentMethod] = useState(0); // 0 = "cod" , 1= "Razorpay"
    const user = useSelector(store => store.user)
    const cart = useSelector(store => store.cart)
    const router = useRouter()
    const dispatch = useDispatch()


    const defaultAddressIndex = user?.data?.address?.findIndex(add => add.isdefault) ?? 0;
    const [selectedAddress, setSelectedAddress] = useState(defaultAddressIndex);


    const checkOutHandler = () => {
        const data = {
            paymentMethod,
            address: user?.data?.address[selectedAddress],
            user_id: user?.data?._id
        }

        axiosInstance.post("/order/createOrder", data)
            .then(
                (response) => {
                    // console.log(response)
                    if (response.data.flag == 1) {
                        if (paymentMethod == 0) {
                            dispatch(emptyCart())
                            router.push(`/order-placed/${response.data.order_id}`)
                        } else {
                            ShowPaymentPopup(response.data.order_id, response.data.razorpay_order_id)
                        }
                    }
                }
            ).catch(
                (error) => {
                    toast.error(response.data.message)
                }
            )
    }

    const ShowPaymentPopup = (order_id, razorpay_order_id) => {
        const razorpayKey = process.env.NEXT_PUBLIC_KEY_ID;
    
        if (!razorpayKey) {
            toast.error("Razorpay key is missing. Please check environment variables.");
            return;
        }
    
        const options = {
            key: razorpayKey,  // Ensure the key is defined
            currency: "INR",
            name: "Ishop",
            order_id: razorpay_order_id,
            handler: (razorpay_response) => {
                axiosInstance.post("/order/paymentSuccess", { razorpay_response, order_id })
                    .then(response => {
                        console.log(response);
                        
                        
                        if (response.data.flag === 1) {
                            dispatch(emptyCart());
                            router.push(`/order-placed/${response.data.order_id}`);
                        }
                    })
                    .catch(error => {
                        toast.error(error.response?.data?.message || "Payment failed.");
                    });
            },
            prefill: {
                name: user?.data?.name,
                email: user?.data?.email,
                contact: user?.data?.phone,
            },
            theme: { color: "#F37254" },
        };
    
        const rzp1 = new Razorpay(options);
    
        rzp1.on("payment.failed", function (response) {
            console.log(response);
            toast.error("Payment failed. Please try again.");
        });
    
        rzp1.open();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-black">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

            {/* Select Address */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Select Address</h3>
                {user?.data?.address.map(
                    (address, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer mb-2 transition-all ${selectedAddress === index ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                                onClick={() => setSelectedAddress(index)}
                            >
                                <FaMapMarkerAlt className="text-blue-500" />
                                <div>
                                    <address>{address.name} ,{address.flat} ,{address.landmark} ,{address.street} ,{address.area} ,{address.district} ,{address.state} <br />Contact : {address.contact}, <br /> Pincode : {address.pincode},<br /></address>
                                </div>
                            </div>
                        )
                    })}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${paymentMethod === 0 ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod(0)}
                    >
                        <FaMoneyBillWave className="text-green-500" /> Cash on Delivery
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${paymentMethod === 1 ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod(1)}
                    >
                        <FaCreditCard className="text-blue-500" /> Razorpay
                    </button>
                </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between text-gray-700">
                    <span>Cart Total:</span>
                    <span>{Number(cart?.original_total).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Discount:</span>
                    <span>-{Number(cart?.original_total - cart?.final_total).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                    <span>Final Total:</span>
                    <span>{Number(cart?.final_total).toFixed(2)}</span>
                </div>
            </div>

            {/* Proceed to Payment Button */}
            <button onClick={checkOutHandler} className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all">
                {
                    paymentMethod == 0
                        ?
                        "Place Order"
                        :
                        "Proceed to Payment"
                }
            </button>
        </div>
    );
};

export default Checkout;
