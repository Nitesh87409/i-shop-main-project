import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { getAllOrders, getUserData } from '@/library/api-calls';
import { formatDate, timeAgo } from '@/library/helper';

import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

const OrdersPage = async () => {
    const orders = await getAllOrders();

    const paymentStatusMap = {
        0: "Pending",
        1: "Success",
        2: "Failed",
        3: "Refund Init",
        4: "Refunded"
    };

    const orderStatusMap = {
        0: "Waiting for Payment",
        1: "Order Placed",
        2: "Order Packed",
        3: "Order Dispatched",
        4: "Order Shipped",
        5: "Out for Delivery",
        6: "Delivered",
        7: "Order Canceled"
    };




    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Orders', url: '/admin/order' },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                 button={{ text: "", url: "" }}
                    trash={{link:""}}
                />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">

                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Sr.No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Mode
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Payment Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Order Status
                                    </th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(
                                    (order, index) => {
                                        return (
                                            <tr key={order._id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {index + 1}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order._id}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order.user_id.name} <br /> {order.user_id.email}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order.products.map((product, i) => (
                                                        <span key={i} className="block">{product.quantity} x {product.name}</span>
                                                    ))}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                                    {order.final_total}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                  {order.payment_method === 0 ? "Cash On Delivery" : "Razorpay"}
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {paymentStatusMap[order.payment_status]}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                   {orderStatusMap[order.order_status]}
                                                </td>
                                                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                   {formatDate(order.createdAt)}
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;