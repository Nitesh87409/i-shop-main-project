"use client"
import { lstoadmin } from '@/redux/slices/AdminSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaChartBar, FaTh, FaTags, FaBox, FaPalette, FaRuler, FaClipboardList, FaMoneyBill, FaUsers, FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar() {
    const admin = useSelector((store => store.admin))
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(lstoadmin())
    }, [])

    useEffect(() => {
        if (admin?.data == null && localStorage.getItem("admin") == null) {
            router.push("/admin/login")
        }
    }, [admin?.data])

    const menuItems = [
        { name: "Dashboard", icon: <FaTh />, path: "/admin", featureType: 2 },
        { name: "Analysis", icon: <FaChartBar />, path: "/admin/analysis", featureType: 1 },
    ];
    const AddData = [
        { name: "Categories", icon: <FaTags />, path: "/admin/category", featureType: 3 },
        { name: "Product", icon: <FaBox />, path: "/admin/product", featureType: 3 },
        { name: "Color", icon: <FaPalette />, path: "/admin/color", featureType: 3 },
        { name: "Accessories", icon: <FaRuler />, path: "/admin/accessories", featureType: 3 },
    ];
    const OrderAndTransaction = [
        { name: "Orders", icon: <FaClipboardList />, path: "/admin/order", featureType: 2 },
        { name: "Transactions", icon: <FaMoneyBill />, path: "/admin/transaction", featureType: 2 }
    ];
    const UserAdminAuth = [
        { name: "Users", icon: <FaUsers />, path: "/users", featureType: 1 },
        { name: "Admin Users", icon: <FaUserShield />, path: "/admin/admins-listing", featureType: 1 }
    ];

    const renderSection = (title, items) => {
        const filteredItems = items.filter(item => {
            if (admin?.data?.type == 2 && item.featureType == 1) return false;
            if (admin?.data?.type == 3 && item.featureType != 3) return false;
            return true;
        });
        // console.log(filteredItems, "filteredItems");
        if (filteredItems.length === 0) return null;
        
        return (
            <div>
                <h2 className="text-gray-600 uppercase text-sm font-semibold mb-3">{title}</h2>
                <ul className="space-y-2">
                    {filteredItems.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <li className="flex items-center gap-3 text-gray-700 hover:text-black p-2 mb-1 bg-gray-200 rounded">
                                {item.icon}
                                <div>{item.name}</div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <aside className="col-span-1 bg-gray-100 p-4 shadow-md">
            <nav className="space-y-8">
                {renderSection("Overview", menuItems)}
                {renderSection("Ecommerce", AddData)}
                {renderSection("Order Management", OrderAndTransaction)}
                {renderSection("Users", UserAdminAuth)}
            </nav>
        </aside>
    );
}
