"use client";

import { axiosInstance } from "@/library/helper";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { lstouser, updateUserData } from "@/redux/slices/UserSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaBox, FaCheckCircle, FaClipboardCheck, FaClock, FaCreditCard, FaExchangeAlt, FaMoneyBillWave, FaMotorcycle, FaShippingFast, FaTimesCircle, FaTruck, FaUndoAlt } from "react-icons/fa";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [address_popup, setAddress_PopUp] = useState(false)
    const [orders, setOrders] = useState([]);
  const router = useRouter()
  // console.log(address_popup, "address_popup");

  const   user =   useSelector(store => store.user)
  // console.log(user, "user");

  const dispatch = useDispatch();




// Order status, payment method, and payment status maps
  const orderStatusMap = {
  0: { text: "Waiting for Payment", color: "text-gray-500", icon: <FaTimesCircle className="mr-1" /> },
  1: { text: "Order Placed", color: "text-green-500", icon: <FaCheckCircle className="mr-1" /> },
  2: { text: "Order Packed", color: "text-blue-500", icon: <FaBox className="mr-1" /> },
  3: { text: "Order Dispatched", color: "text-yellow-500", icon: <FaTruck className="mr-1" /> },
  4: { text: "Order Shipped", color: "text-purple-500", icon: <FaShippingFast className="mr-1" /> },
  5: { text: "Out for Delivery", color: "text-orange-500", icon: <FaMotorcycle className="mr-1" /> },
  6: { text: "Delivered", color: "text-green-700", icon: <FaClipboardCheck className="mr-1" /> },
  7: { text: "Order Canceled", color: "text-red-500", icon: <FaTimesCircle className="mr-1" /> },
};
const paymentMethodMap = {
  0: { text: "Cash On Delivery", color: "text-blue-500", icon: <FaMoneyBillWave className="mr-1" /> },
  1: { text: "Razorpay", color: "text-purple-500", icon: <FaCreditCard className="mr-1" /> },
};
const paymentStatusMap = {
  0: { text: "Pending", color: "text-yellow-500", icon: <FaClock /> },
  1: { text: "Success", color: "text-green-500", icon: <FaCheckCircle /> },
  2: { text: "Failed", color: "text-red-500", icon: <FaTimesCircle/> },
  3: { text: "Refund Initiated", color: "text-orange-500", icon: <FaUndoAlt /> },
  4: { text: "Refunded", color: "text-gray-500", icon: <FaExchangeAlt /> },
};



  // Function to update user details
  const UpdateUser = () => {
    const updatedUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    ;

    // console.log("Updated User Data:", updatedUser);
    // update user api call
    axiosInstance.put(`/user/updateuser/${user?.data?._id}`, updatedUser)
      .then((res) => {
        if (res.data.flag == 1) {
          toast.success("User Data Updated Successfully")
          console.log(res);
          if (res.data.user) {
            dispatch(updateUserData({ user: res.data.user }))
          }

          // Update the user data in the Redux store
        } else {
          console.log("Error Updating User Data", res.data.message)

        }
      })
  };



  const addressSubmitHandler = (data) => {
    axiosInstance.post(`/user/address/${user.data?._id}`, data)
      .then(
        (response) => {
          if (response.data.flag == 1) {
            toast.success(response.data.message)
            dispatch(updateUserData({ user: response.data.updatedUser }))
          } else {
            toast.error(response.data.message)
          }
        }
      ).catch(
        (err) => {
          toast.error(response.data.message)
        }
      )
  }




  // Function to update user password
  const UpdatePassword = () => {
    const PasswordData = {
      currentpassword: currentpassword.current.value,
      newpassword: newpassword.current.value,
      confirmpassword: confirmpassword.current.value,
    }
    if (PasswordData.newpassword !== PasswordData.confirmpassword) {
      toast.error("New Password and Confirm Password do not match")
      return;
    }
    if (PasswordData.newpassword.length < 6) {
      toast.error("New Password must be at least 6 characters long")
      return;
    }

    // update password api call
    axiosInstance.post(`/user/update_password/${user?.data?._id}`, PasswordData)
      .then((res) => {
        if (res.data.flag == 1) {
          // console.log("User Password Updated Successfully",res.data.user)
          toast.success(res.data.message)
          console.log(res);
        } else {
          console.log("Error Updating User Password", res.data.message)
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error Updating User Password", err);
        toast.error("Error Updating User Password");
      });

  }

   // Function to Remove Address
   const removeAddress = (index) => {
    axiosInstance.delete(`/user/remove_address/${user.data?._id}/${index}`)
      .then(response => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          dispatch(updateUserData({ user: response.data.updatedUser })); // Update Redux Store
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(err => {
        toast.error("Failed to remove address");
      });
  };




  // Refs for input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const currentpassword = useRef(null);
  const newpassword = useRef(null);
  const confirmpassword = useRef(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState(null);

const Options_Handler = (index)=>{
 setIsOptionsOpen(isOptionsOpen === index ? null : index);
}

const setDefaultAddress = (addressId) => {
  console.log(addressId, "addressId");
  
  axiosInstance.patch(`/user/defaultAddress/${user.data?._id}/${addressId}`)
    .then(response => {

      if (response.data.flag === 1) {
        toast.success(response.data.message);
        
        dispatch(updateUserData({ user: response.data.user }));
      } else {
        toast.error(response.data.message);
      }
    })
    .catch(err => {
      toast.error("Failed to set address as default");
    });
};

useEffect(() => {
  if (user?.isLoading) {
    // Wait until user data is fully loaded
    return;
  }

  if (user?.data == null) {
    toast.error("Please Login First");
    router.push("/website/login");
  }
}, [user?.data, user?.isLoading]);


  useEffect(() => {
    if (user?.data) {
      axiosInstance.get(`/order/${user.data._id}`)
        .then((response) => {
          setOrders(response.data.orders);
        })
        .catch((error) => {
          toast.error("Failed to fetch orders");
        });
    }
  }, [user]);





  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="space-y-5 !text-black">
            <InputField
              placeholder="Full Name"
              type="text"
              defaultValue={user?.data?.name}
              ReferenceValue={nameRef}
            />
            <InputField
              placeholder="Email Address"
              type="email"
              defaultValue={user?.data?.email}
              ReferenceValue={emailRef}
            />
            <InputField
              placeholder="Phone Number"
              type="tel"
              defaultValue={user?.data?.phone}
              ReferenceValue={phoneRef}
            />
            <PrimaryButton text="Update Details" changeHander={UpdateUser} />
          </div>
        );
      case "addresses":
        return (
          <div className="space-y-5">
            <AddAddress onSave={addressSubmitHandler} isOpen={address_popup} onClose={() => setAddress_PopUp(false)} />
            {
              user?.data?.address?.length < 0
                ? <p>No Saved Address Found</p>
                : user?.data?.address?.map((addres, index) => {
                  return (
                    <div className="glass-card border-[2px] rounded-2xl p-2 flex justify-between text-black" key={index}>
                     
                      <div>
                        <p className="font-medium">{addres?.name}</p>
                        <p className="text-sm text-gray-600">{addres?.flat}</p>
                        <p className="text-sm text-gray-500">{addres?.street} {addres?.landmark} </p>
                        <p className="text-sm text-gray-500">{addres?.district}</p>
                        <p className="text-sm text-gray-500">{addres?.state}</p>
                        <p className="text-sm text-gray-500">{addres?.pincode}</p>
                        
                      </div>
                      <div>
                      {addres.isdefault && (
      <span className="text-green-500 font-bold mr-2">✔ </span> // Tick icon for default address
    )}
                        <button className={`rounded-xl border p-2 ${isOptionsOpen === index ? "bg-blue-400": ""}`} onClick={()=>Options_Handler(index)} key={index}> Options</button>
                        {isOptionsOpen === index && (
                          <div className="absolute right-3 bg-white shadow-lg rounded-lg p-4 mt-2">
                          
                            <button className="block text-red-600 hover:bg-red-100 px-4 py-2 rounded" onClick={() => {removeAddress(index) }}>Delete</button>
                            <button className="block text-blue-600 hover:bg-blue-100 px-4 py-2 rounded"onClick={() => setDefaultAddress(addres._id)}>Set as Default</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
            }
            <PrimaryButton text="Add New Address" changeHander={() => setAddress_PopUp(true)} />
          </div>
        );
      case "password":
        return (
          <div className="space-y-5">
            <InputField placeholder="Current Password" type="password" defaultValue={user?.data?.password} ReferenceValue={currentpassword} />
            <InputField placeholder="New Password" type="password" ReferenceValue={newpassword} />
            <InputField placeholder="Confirm New Password" type="password" ReferenceValue={confirmpassword} />
            <PrimaryButton text="Change Password" changeHander={UpdatePassword} />
          </div>
        );
        case "orders":
          return (
     
          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">My Orders</h1>

            {orders.length === 0 ? (
              <p className="text-center text-lg text-gray-500">No orders found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                {orders?.map((order) => {
                  const date = new Date(order.createdAt).getDate();
                  const month = new Date(order.createdAt).getMonth() + 1;
                  const year = new Date(order.createdAt).getFullYear();
                  const status = orderStatusMap[order.order_status];
                  const payment = paymentMethodMap[order.payment_method];
                  const paymentStatus = paymentStatusMap[order.payment_status];

                  return (
                    <div key={order._id} className="border p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
                      {/* <p className="text-xl font-semibold text-gray-800">{order.address.name}</p> */}
                      <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-700">{order._id}</span></p>
                      <p className="text-sm text-gray-500">Date: <span className="font-medium text-gray-700">{`${date}/${month}/${year}`}</span></p>
                      <p className="text-lg font-semibold mt-2 text-black">Amount: <span className="text-blue-600">₹{order.final_total.toFixed(2)}</span></p>

                      {/* Order Status */}
                      <div className="flex items-center space-x-2 mt-4 bg-gray-100 p-2 rounded-lg">
                        <span className={`flex items-center ${status.color} font-medium text-sm`}>
                          {status.icon} <span className="ml-1">{status.text}</span>
                        </span>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-center space-x-2 mt-3 bg-gray-100 p-2 rounded-lg">
                        <span className={`flex items-center ${payment.color} font-medium text-sm`}>
                          {payment.icon} <span className="ml-1">{payment.text}</span>
                        </span>
                      </div>

                      {/* Payment Status */}
                      <div className="flex items-center space-x-2 mt-3 bg-gray-100 p-2 rounded-lg">
                        <span className={`flex items-center ${paymentStatus.color} font-medium text-sm`}>
                          {paymentStatus.icon} <span className="ml-1">{paymentStatus.text}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 py-14 px-4">
      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/80 shadow-2xl rounded-3xl p-8 border border-white/30">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">👤 My Profile</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["details", "addresses", "password","orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition 
                ${activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab === "details" && "My Details"}
              {tab === "addresses" && "Saved Addresses"}
              {tab === "password" && "Change Password"}
               {tab === "orders" && "See Orders"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}

const InputField = ({ placeholder, defaultValue, type, ReferenceValue }) => (
  <input
    type={type}
    placeholder={placeholder}
    defaultValue={defaultValue}
    ref={ReferenceValue}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow-sm transition"
  />
);

const PrimaryButton = ({ text, changeHander }) => (
  <button
    className="mt-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition"
    onClick={changeHander}
  >
    {text}
  </button>
);



const AddAddress = ({ isOpen, onClose, onSave }) => {
  const [PostOffice, setPostOffices] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    flat: "",
    landmark: "",
    street: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
    contact: "",
  });
  // console.log(formData, "formData");


  const PincodeHandler = (e) => {
    const pincode = e.target.value;

    // Update the form data to reset the area field
    setFormData(prev => ({
      ...prev,
      pincode: pincode,
      area: "", // Reset area when a new pincode is entered
      district: "",
      state: ""
    }));

    if (pincode.length !== 6) {
      toast.error("Pincode must have 6 characters.");
      setPostOffices([]); // Clear PostOffice list if pincode is invalid
    } else {
      axios.get(`${process.env.NEXT_PUBLIC_PINCODE_API}${pincode}`)
        .then(response => {
          if (response.data && response.data[0]?.Status === "Success") {
            const data = response.data[0].PostOffice;
            setPostOffices(data);
            console.log("PostOffice Data:", data);

            setFormData(prev => ({
              ...prev,
              district: data[0]?.District || "",
              state: data[0]?.State || "",
              area: ""
            }));
          } else {
            toast.error(response.data?.[0]?.Message || "Invalid pincode.");
          }
        })
        .catch(err => {
          toast.error("Error fetching pincode details.");
        });
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      handleChange(e);
    }
  };

  // Function to handle input changes
  // This function updates the form data state when the user types in the input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked, "handleChange");
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };



  // Function to handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    e.target.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit} className="space-y-3 !text-black">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required={true} />
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded" required={true} />
          <input type="text" name="flat" value={formData.flat} onChange={handleChange} placeholder="Flat No." className="w-full p-2 border rounded" required={true} />
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark .." className="w-full p-2 border rounded" required={true} />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="w-full p-2 border rounded" required={true} />
          <input type="text" name="pincode" value={formData.pincode} onChange={handlePincodeChange} onBlur={PincodeHandler} placeholder="Pincode" className="w-full p-2 border rounded" required={true} />
          <select name="area" id="area" value={formData.area} className="w-full p-2 border rounded" placeholder="area" onChange={handleChange} required={true}>
            <option value="">Select a Area</option>
            {
              PostOffice?.map(
                (po, index) => {
                  return <option key={index}>{po.Name}</option>
                }
              )
            }
          </select>
          <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="w-full p-2 border rounded" />
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" />
          <div className="flex justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
