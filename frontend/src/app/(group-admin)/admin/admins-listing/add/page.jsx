// "use client"

// import PageHeader from '@/components/admin/PageHeader'
// import { axiosInstance } from '@/library/helper'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'
// import { toast } from 'react-toastify'

// export default function AddAdmin() {
//     const [viewPassword, setViewPassword] = useState(false)
//     const [loading, setLoading] = useState(false);
//     const router = useRouter()

//     const SubmitHandler = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         let type = ""
//         if (e.target.type.value == "Super Admin") {
//             type = 1
//         }
//         else if (e.target.type.value == "Sub Admin") {
//             type = 2
//         }
//         else if (e.target.type.value == "Staff") {
//             type = 3
//         } else {
//             type = ""
//         }

//         const name = e.target.name.value
//         const email = e.target.email.value
//         const contact = e.target.contact.value
//         const password = e.target.password.value
//         const confirm_password = e.target.confirm_password.value

//         if (!name || !email || !contact || !password || !confirm_password || !type) {
//             toast.error("All fields are required");
//             setLoading(false);
//             return;
//         }

//         if (password != confirm_password) {
//             toast.error("Password Must Match")
//             return;
//         }

//         const data = { name, email, contact, password, type }

//         try {
//             const res = await axiosInstance.post("/admin/register", data);
//             if (res.data.flag === 1) {
//                 toast.success(res.data.message);
//                 e.target.reset();
//                 router.push("/admin/admins-listing")
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             toast.error("Internal Server Error");
//         }

//         setLoading(false);
//     }

//     const options = [
//         { name: "Super Admin" },
//         { name: "Sub Admin" },
//         { name: "Staff" }
//     ]


//     const breadcrums = [
//         { label: 'Home', url: '/admin' },
//         { label: 'Admin', url: '/admin/admins-listing' },
//         { label: 'Add Admin', url: '/admin/admins-listing/add' }
//     ];

//     return (

//         <div className="container mx-auto px-4 sm:px-8">
//             <div className="py-8">
//                 <PageHeader breadcrums={breadcrums}
//                     button={{ text: "Back to View", url: "/admin/admins-listing" }}
//                 />
//                 <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//                     <div className="mb-8">
//                         <h2 className="text-xl font-semibold text-gray-800">Add New Admin</h2>
//                     </div>

//                     <form onSubmit={SubmitHandler} className='w-full'>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <div className="mb-2">
//                                 <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Name</label>
//                                 <input
//                                     type="text"
//                                     name='name'
//                                     id='name'
//                                     placeholder='Enter Admin Name'
//                                     className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
//                                 />
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor="email" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Email</label>
//                                 <input
//                                     type="email"
//                                     name='email'
//                                     id='email'
//                                     placeholder='Enter Admin Email'
//                                     className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
//                                 />
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <div className="mb-2">
//                                 <label htmlFor="contact" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Contact</label>
//                                 <input
//                                     type="text"
//                                     name='contact'
//                                     id='contact'
//                                     placeholder='Enter Admin Contact'
//                                     className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
//                                 />
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor="type" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Select Type</label>
//                                 <select name="type" id="type" className='appearance-none bg-gray-200 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full text-black'>
//                                     <option value="">Select Type</option>
//                                     {
//                                         options.map(
//                                             (item, index) => <option value={item.name}>{item.name}</option>
//                                         )
//                                     }
//                                 </select>
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <div className="mb-2 relative">
//                                 <label htmlFor="password" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Password</label>
//                                 <input
//                                     type={viewPassword ? "text" : "password"}
//                                     name='password'
//                                     id='password'
//                                     placeholder='Enter Admin Password'
//                                     className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
//                                 />
//                                 {
//                                     viewPassword == false
//                                         ?
//                                         <FaEye className='absolute top-[45px] right-2 cursor-pointer' onClick={() => setViewPassword(true)} />
//                                         :
//                                         <FaEyeSlash className='absolute top-[45px] right-2 cursor-pointer' onClick={() => setViewPassword(false)} />
//                                 }
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor="confirm_password" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Confirm Password</label>
//                                 <input
//                                     type={viewPassword ? "text" : "password"}
//                                     name='confirm_password'
//                                     id='confirm_password'
//                                     placeholder='Enter Admin confirm_password'
//                                     className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`mt-6 px-6 text-white font-medium p-3 rounded-lg transition duration-300 ease-in-out 
//                             ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
//                             >
//                                 {loading ? "Signing Up..." : "Sign Up"}
//                             </button>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </div>
//     )
// }



// // const Form = () => {


// //     return (
// //         <div className="p-5 bg-white shadow-lg rounded-ee-lg">
// //             <form onSubmit={SubmitHandler} className='w-full'>
// //                 <div className='grid grid-cols-2 gap-4'>
// //                     <div className="mb-2">
// //                         <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Name</label>
// //                         <input
// //                             type="text"
// //                             name='name'
// //                             id='name'
// //                             placeholder='Enter Admin Name'
// //                             className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
// //                         />
// //                     </div>
// //                     <div className="mb-2">
// //                         <label htmlFor="email" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Email</label>
// //                         <input
// //                             type="email"
// //                             name='email'
// //                             id='email'
// //                             placeholder='Enter Admin Email'
// //                             className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
// //                         />
// //                     </div>
// //                 </div>
// //                 <div className='grid grid-cols-2 gap-4'>
// //                     <div className="mb-2">
// //                         <label htmlFor="contact" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Contact</label>
// //                         <input
// //                             type="text"
// //                             name='contact'
// //                             id='contact'
// //                             placeholder='Enter Admin Contact'
// //                             className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
// //                         />
// //                     </div>
// //                     <div className="mb-2">
// //                         <label htmlFor="type" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Select Type</label>
// //                         <select name="type" id="type" className='appearance-none bg-gray-200 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'>
// //                             <option value="">Select Type</option>
// //                             {
// //                                 options.map(
// //                                     (item, index) => <option value={item.name}>{item.name}</option>
// //                                 )
// //                             }
// //                         </select>
// //                     </div>
// //                 </div>
// //                 <div className='grid grid-cols-2 gap-4'>
// //                     <div className="mb-2 relative">
// //                         <label htmlFor="password" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Password</label>
// //                         <input
// //                             type={viewPassword ? "text" : "password"}
// //                             name='password'
// //                             id='password'
// //                             placeholder='Enter Admin Password'
// //                             className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
// //                         />
// //                         {
// //                             viewPassword == false
// //                                 ?
// //                                 <FaEye className='absolute top-[45px] right-2 cursor-pointer' onClick={() => setViewPassword(true)} />
// //                                 :
// //                                 <FaEyeSlash className='absolute top-[45px] right-2 cursor-pointer' onClick={() => setViewPassword(false)} />
// //                         }
// //                     </div>
// //                     <div className="mb-2">
// //                         <label htmlFor="confirm_password" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Confirm Password</label>
// //                         <input
// //                             type={viewPassword ? "text" : "password"}
// //                             name='confirm_password'
// //                             id='confirm_password'
// //                             placeholder='Enter Admin confirm_password'
// //                             className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
// //                         />
// //                     </div>
// //                 </div>
// //                 <div className="flex justify-end">
// //                     <button
// //                         type="submit"
// //                         disabled={loading}
// //                         className={`mt-6 px-6 text-white font-medium p-3 rounded-lg transition duration-300 ease-in-out 
// //                             ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
// //                     >
// //                         {loading ? "Signing Up..." : "Sign Up"}
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     )
// // }