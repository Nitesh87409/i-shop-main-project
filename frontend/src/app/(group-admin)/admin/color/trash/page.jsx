import PageHeader from '@/components/admin/PageHeader';

import React from 'react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { timeAgo } from '@/library/helper';
import DeleteBtn from '@/components/admin/DeleteBtn';
import ToggleStatus from '@/components/admin/ToggleStatus';
import Link from 'next/link';
import { ColorTrash } from '@/library/api-calls';
import RestoreBtn from '@/components/admin/RestoreBtn';

const ColorTrashPage = async () => {
    const colors = await ColorTrash();

    

    
    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Colors', url: '/admin/color' },
        { label: 'Trash', url: '/admin/color/trash' },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                    button={{ text: "Back to View", url: "/admin/color" }}
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
                                    Color Code
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Deleted At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {colors.map(
                                    (color,index)=>{
                                        return(
                                            <tr key={color._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-3 text-center">
                                        <div className="w-[30px] h-[30px] rounded-full" style={{ backgroundColor: color.code }}></div>
                                        {color.name}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {color.code}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                            <ToggleStatus current_status={color.status} endpoint={`/color/change-status/${color._id}/`}/>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(color.createdAt)}
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(color.deletedAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <div className='flex gap-3 cursor-pointer'>
                                            <DeleteBtn endpoint={`/color/delete/${color._id}`}/>
                                            <RestoreBtn endpoint={`/color/restore/${color._id}`} />
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

export default ColorTrashPage;