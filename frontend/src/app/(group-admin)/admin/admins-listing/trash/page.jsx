// import PageHeader from '@/components/admin/PageHeader';
// import { AdminTrash, getAdminData} from '@/library/api-calls';
// import React from 'react';
// import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
// import { timeAgo } from '@/library/helper';
// import DeleteBtn from '@/components/admin/DeleteBtn';
// import ToggleStatus from '@/components/admin/ToggleStatus';
// import Link from 'next/link';
// import RestoreBtn from '@/components/admin/RestoreBtn';

// const AdminListing = async () => {
//     const admins = await AdminTrash();

    

    
//     const breadcrums = [
//         { label: 'Home', url: '/admin' },
//         { label: 'Admin', url: '/admin/admins-listing' },
//         { label: 'Trash', url: '/admin/admins-listing/trash' },
//     ];


//     return (
//         <div className="container mx-auto px-4 sm:px-8 text-black">
//             <div className="py-8">
//                 <PageHeader breadcrums={breadcrums}
//                     button={{ text: "Back to View", url: "/admin/admins-listing" }}
                    
//                 />
//                 <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//                     <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
//                         <table className="min-w-full leading-normal">
//                             <thead>
//                                 <tr>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Sr.
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Name
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                        Email
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Contact
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                        Type
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Created At
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Updated At
//                                     </th>
//                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {admins.map(
//                                     (admin,index)=>{
//                                         return(
//                                             <tr key={admin._id}>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {index + 1}
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {admin.name}
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {admin.email}
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-text">

//                                             <ToggleStatus current_status={admin.status} endpoint={`/admin/change-status/${admin._id}/`}/>
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {admin.contact}
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                         {
//                                             admin.type == 1 && "Super Admin"
//                                         }
//                                         {
//                                             admin.type == 2 && "Sub Admin"
//                                         }
//                                         {
//                                             admin.type == 3 && "Staff"
//                                         }
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {timeAgo(admin.createdAt)}
//                                         </td>

//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                             {timeAgo(admin.updatedAt)}
//                                         </td>
//                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
//                                             <div className='flex gap-3'>
//                                             <RestoreBtn endpoint={`/admin/restore/${admin._id}`}/>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                         )
//                                     }
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminListing;