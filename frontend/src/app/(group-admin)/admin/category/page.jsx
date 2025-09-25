import PageHeader from '@/components/admin/PageHeader';
import { getCategories } from '@/library/api-calls';
import React from 'react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { timeAgo } from '@/library/helper';
import DeleteBtn from '@/components/admin/DeleteBtn';
import ToggleStatus from '@/components/admin/ToggleStatus';
import Link from 'next/link';

const CategoryPage = async () => {
    const categories = await getCategories();

    

    
    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Category', url: '/admin/category' },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                    button={{ text: "Add", url: "/admin/category/add" }}
                    trash={{link:"/admin/category/trash"}}
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
                                        Slug
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
                                {categories.map(
                                    (category,index)=>{
                                        return(
                                            <tr key={category._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {category.name}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {category.slug}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                            <ToggleStatus current_status={category.status} endpoint={`/category/change-status/${category._id}/`}/>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(category.createdAt)}
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {timeAgo(category.updatedAt)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <div className='flex gap-3'>
                                            <DeleteBtn endpoint={`/category/move-to-trash/${category._id}`}/>
                                            <Link href={`/admin/category/edit/${category._id}`}>
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

export default CategoryPage;