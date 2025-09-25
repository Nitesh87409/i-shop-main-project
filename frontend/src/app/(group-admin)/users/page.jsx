import DeleteBtn from '@/components/admin/DeleteBtn';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { getUserData } from '@/library/api-calls';
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

const UserPage = async () => {
    const Users = await getUserData();

    

    
    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Users', url: '/users' },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                    button={{ text: "Add", url: "/users/add" }}
                    trash={{link:"/users/trash"}}
                />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Sr.
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Contact Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Updated At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users.map(
                                    (user,index)=>{
                                        return(
                                            <tr key={user._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user.name}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user.email}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {user.phone}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                            <ToggleStatus current_status={user.status} endpoint={`/user/change-status/${user._id}/`}/>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(user.createdAt)}
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(user.updatedAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <div className='flex gap-3'>
                                            <DeleteBtn endpoint={`/user/move-to-trash/${user._id}`}/>
                                            <Link href={`/user/edit/${user._id}`}>
                                            <FaPenAlt />
                                            </Link>
                                            </div>
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

export default UserPage;