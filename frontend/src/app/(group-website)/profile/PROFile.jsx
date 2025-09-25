"use client"
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaBox, FaTruck, FaShippingFast, FaMotorcycle, FaClipboardCheck, FaTimesCircle, FaMoneyBillWave, FaCreditCard, FaClock, FaUndoAlt, FaExchangeAlt } from "react-icons/fa";
import { FaAngleRight, FaTachometerAlt, FaFileInvoice, FaMapMarkerAlt, FaUserAlt, FaTimes, FaUser, FaPhone, FaEnvelope, FaPenAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLock } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { axiosInstance } from "@/library/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout, updateUserData } from "@/redux/slices/UserSlice";
import axios from "axios";

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
  2: { text: "Failed", color: "text-red-500", icon: <FaTimesCircle /> },
  3: { text: "Refund Initiated", color: "text-orange-500", icon: <FaUndoAlt /> },
  4: { text: "Refunded", color: "text-gray-500", icon: <FaExchangeAlt /> },
};

export default function ProfilePage() {
  // const [activeTab, setActiveTab] = useState("My Account");
  const [activeTab, setActiveTab] = useState("Order");
  const user = useSelector(store => store.user);
  const dispatch = useDispatch()
  const router = useRouter()
  const [NameData, setNameData] = useState(false)
  const [orders, setOrders] = useState([]);

  // if (user?.data == null) {
  //   router.push("/website/login")
  //   return;
  // }

  const tabs = ["My Account", "Address", "Change Password", "Order"];

  // name,email, mobile no. Update Code
  const DataSubmitHandler = (data) => {
    axiosInstance.put(`/user/updateuser/${user.data?._id}`, data)
      .then((response) => {
        if (response.data.flag === 1) {
          toast.success(response.data.message);

          if (response.data.user) {
            dispatch(updateUserData({ user: response.data.user }));
          } else {
            console.error("User data is missing in response");
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(response.data.message)
      });
  };

  // order data
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



  // ADD New Address code 
  const [address_popup, setAddress_PopUp] = useState(false)
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
  // Remove Address
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

  // Default Change Handler
  const defaultHandler = (value, index) => {
    axiosInstance.patch(`/user/defaultAddress/${user.data?._id}/${index}/${!value}`)
      .then(
        (response) => {
          if (response.data.flag == 1) {
            dispatch(updateUserData({ user: response.data.user }))
          }
        }
      ).catch(
        (error) => {
          console.log(error.message)
        }
      )
  }


  // Change Password Code
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // change password Handler
  const ChangePassword = (e) => {
    e.preventDefault();
    setError("");

    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    const data = {
      currentpassword: currentPassword,
      newpassword: newPassword
    }
    axiosInstance.post(`/user/update_password/${user.data?._id}`, data)
      .then(
        (response) => {
          if (response.data.flag == 1) {
            toast.success(response.data.message)
            e.target.reset()
          }
        }
      ).catch(
        (err) => {
          toast.error(response.data.message)
        }
      )
  };

  return (
    <div className="max-w-[1250px] mx-auto p-6">
      <div className="flex items-center gap-2">Home <FaAngleRight /> <span className="text-blue-500">Profile</span></div>
      <h1 className="text-2xl font-semibold mb-4 text-center">My Profile</h1>
      {/* Tabs */}
      <div className="mt-10">
        <ul className="flex flex-wrap justify-center space-x-4">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer bg-white font-semibold px-6 py-2 rounded-md flex items-center space-x-2 transition ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "My Account" && <FaTachometerAlt />}
              {tab === "Address" && <FaMapMarkerAlt />}
              {tab === "Change Password" && <FaUserAlt />}
              {tab === "Order" && <FaFileInvoice />}
              <span>{tab}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 shadow-lg rounded-2xl border">
        {activeTab === "My Account" && (
          <div className="max-w-[70%] mx-auto p-6 bg-white rounded-2xl shadow-lg border mt-10">
            <DataHandler onSave={DataSubmitHandler} user={user} isOpen={NameData} onClose={() => setNameData(false)} />
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-center mb-6">Dashboard Overview</h2>
              <FaPenAlt className="cursor-pointer" onClick={() => setNameData(true)} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <FaUser className="text-blue-500 text-xl" />
                <span className="text-lg font-medium">{user.data?.name}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <FaPhone className="text-green-500 text-xl" />
                <span className="text-lg font-medium">{user.data?.phone}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <FaEnvelope className="text-red-500 text-xl" />
                <span className="text-lg font-medium">{user.data?.email}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <FaMapMarkerAlt className="text-purple-500 text-xl" />
                <div className="text-md font-medium w-[100%]">
                  {
                    user.data?.address.length == 0
                      ?
                      <p>No saved addresses found.</p>
                      :
                      user.data?.address.map(
                        (add, index) => {
                          return (
                            <div key={index} className="border-[2px] border-black rounded-lg p-3 mb-2">
                              <div className="flex justify-between">
                                <span className="text-md font-bold block">({index + 1}) Address :-</span>
                                <button className={`text-sm font-bold p-2 rounded ${add.isdefault == true ? "bg-green-200" : "bg-red-200"}`}>
                                  {add.isdefault == true ? "Default Address" : "Set As a Default"}
                                </button>
                              </div>
                              <div className="p-3">
                                <address>{add.name},{add.flat},{add.landmark},{add.street}<br />Contact : {add.contact}, <br /> Pincode : {add.pincode},<br /> {add.area},{add.district}, <br /> {add.state}</address>
                              </div>
                            </div>
                          )
                        }
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Address" && (
          <div className="w-[70%] mx-auto">
            <AddAddress onSave={addressSubmitHandler} isOpen={address_popup} onClose={() => setAddress_PopUp(false)} />
            <div className="flex justify-between p-2 mb-3">
              <h2 className="text-xl font-semibold mb-2">Saved Addresses</h2>
              <button className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600" onClick={() => setAddress_PopUp(true)}>Add Address</button>
            </div>
            {
              user.data?.address.length == 0
                ?
                <p>No saved addresses found.</p>
                :
                user.data?.address.map(
                  (add, index) => {
                    return (
                      <div key={index} className="border-[2px] border-black rounded-lg p-3 mb-2">
                        <div className="flex justify-between">
                          <span className="text-md font-bold block">({index + 1}) Address :-</span>
                          <div className="flex gap-2">
                            <button className="p-2 bg-red-200 rounded hover:bg-red-300" onClick={() => removeAddress(index)}><FaTimes /></button>
                            <button onClick={() => defaultHandler(add.isdefault, index)} className={`text-sm font-bold p-2 rounded ${add.isdefault == true ? "bg-green-200" : "bg-red-200"}`}>
                              {add.isdefault == true ? "Default Address" : "Set As a Default"}
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <address>{add.name},{add.flat},{add.landmark},{add.street}<br />Contact : {add.contact}, <br /> Pincode : {add.pincode},<br /> {add.area},{add.district}, <br /> {add.state}</address>
                        </div>
                      </div>
                    )
                  }
                )
            }
          </div>
        )}
        {activeTab === "Change Password" && (
          <div className="flex justify-center items-center">
            <div className="p-6 shadow-lg rounded-2xl bg-white w-[50%]">
              <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                <AiFillLock /> Change Password
              </h2>
              <form onSubmit={ChangePassword} className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium">Current Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={currentPasswordRef}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>

                <div className="mb-4 relative">
                  <label className="block text-sm font-medium">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={newPasswordRef}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </div>

                <div className="mb-4 relative">
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={confirmPasswordRef}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === "Order" && (
          <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">My Orders</h1>

            {orders.length === 0 ? (
              <p className="text-center text-lg text-gray-500">No orders found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => {
                  const date = new Date(order.createdAt).getDate();
                  const month = new Date(order.createdAt).getMonth() + 1;
                  const year = new Date(order.createdAt).getFullYear();
                  const status = orderStatusMap[order.order_status];
                  const payment = paymentMethodMap[order.payment_method];
                  const paymentStatus = paymentStatusMap[order.payment_status];

                  return (
                    <div key={order._id} className="border p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
                      <p className="text-xl font-semibold text-gray-800">{order.address.name}</p>
                      <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-700">{order._id}</span></p>
                      <p className="text-sm text-gray-500">Date: <span className="font-medium text-gray-700">{`${date}/${month}/${year}`}</span></p>
                      <p className="text-lg font-semibold mt-2">Amount: <span className="text-blue-600">₹{order.final_total.toFixed(2)}</span></p>

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
        )
        }
      </div>
    </div >
  );
}


const DataHandler = ({ isOpen, onSave, onClose, user }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    if (user.data?.name == name && user.data?.phone == phone && user.data?.email == email) {
      return toast.error("Data Not Updated")
    }
    const data = { name, phone, email }
    e.target.reset();
    onSave(data)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text" name="name" defaultValue={user.data?.name} placeholder="Name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="phone" className="font-semibold">Phone Number</label>
            <input type="text" name="phone" defaultValue={user.data?.phone} placeholder="Phone Number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">Email</label>
            <input type="email" name="email" defaultValue={user.data?.email} placeholder="Email" className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}



// add address code

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


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    e.target.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded" />
          <input type="text" name="flat" value={formData.flat} onChange={handleChange} placeholder="Flat No." className="w-full p-2 border rounded" />
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark .." className="w-full p-2 border rounded" />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="w-full p-2 border rounded" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} onBlur={PincodeHandler} placeholder="Pincode" className="w-full p-2 border rounded" />
          <select name="area" id="area" value={formData.area} className="w-full p-2 border rounded" placeholder="area" onChange={handleChange}>
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
