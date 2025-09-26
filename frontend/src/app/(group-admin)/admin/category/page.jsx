import PageHeader from '@/components/admin/PageHeader';
import { getCategories } from '@/library/api-calls';
import React from 'react';
import { FaPenAlt } from 'react-icons/fa';
import { timeAgo } from '@/library/helper';
import DeleteBtn from '@/components/admin/DeleteBtn';
import ToggleStatus from '@/components/admin/ToggleStatus';
import Link from 'next/link';

const CategoryPage = async () => {
    // ✅ Fetch categories
    let categories = await getCategories();

    // ✅ SERVER-SIDE FIX: Ensure categories is always an array
    if (!Array.isArray(categories)) {
        console.warn('getCategories() did not return an array. Using empty array instead.');
        categories = [];
    }

    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Category', url: '/admin/category' },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader
                    breadcrums={breadcrums}
                    button={{ text: "Add", url: "/admin/category/add" }}
                    trash={{ link: "/admin/category/trash" }}
                />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories?.map((category, index) => (
                                        <tr key={category._id}>
                                            <td>{index + 1}</td>
                                            <td>{category.name}</td>
                                            <td>{category.slug}</td>
                                            <td>
                                                <ToggleStatus
                                                    current_status={category.status}
                                                    endpoint={`/category/change-status/${category._id}/`}
                                                />
                                            </td>
                                            <td>{timeAgo(category.createdAt)}</td>
                                            <td>{timeAgo(category.updatedAt)}</td>
                                            <td>
                                                <div className="flex gap-3">
                                                    <DeleteBtn endpoint={`/category/move-to-trash/${category._id}`} />
                                                    <Link href={`/admin/category/edit/${category._id}`}>
                                                        <FaPenAlt />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    // ✅ SERVER-SIDE FIX: Display message if no categories found
                                    <tr>
                                        <td colSpan={7} className="text-center py-4">
                                            No categories found.
                                        </td>
                                    </tr>
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
