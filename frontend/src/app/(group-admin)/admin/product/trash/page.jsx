import PageHeader from '@/components/admin/PageHeader';
import { getProducts, ProductTrash,  } from '@/library/api-calls';
import React from 'react';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { timeAgo } from '@/library/helper';
import DeleteBtn from '@/components/admin/DeleteBtn';
import ToggleStatus from '@/components/admin/ToggleStatus';
import Link from 'next/link';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import MultipleImages from '@/components/admin/MultipleImages';
import RestoreBtn from '@/components/admin/RestoreBtn';

const TrashProductPage = async () => {
    const products = await ProductTrash();
    console.log(products);
    

    




    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Product', url: '/admin/product' },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 text-black">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                    button={{ text: "Back to View", url: "/admin/product" }}
                    
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
                                        Name/Slug
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Orignal Price / Discounted Price / Discount Percentage
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Thumbnail
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Category/Colors
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Stock / TopSelling / Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        TimeStamps
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                
                                {
                                    products.map(
                                        (product, index) => {
                                            return (
                                                <tr key={product._id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span className=' p-1 text-center'>
                                                            Name:- {product.name}
                                                        </span> <br /> <br />
                                                        <span className=' text-center'>
                                                            Slug :- <br />{product.slug}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 flex flex-col items-center gap-1">
                                                        <span className='line-through p-2 border border-black rounded text-black flex items-center'>
                                                            <FaIndianRupeeSign /> {product.original_price}
                                                        </span>
                                                        <span className='p-2 border border-black rounded text-blue-700 flex items-center'>
                                                            <FaIndianRupeeSign /> {product.discounted_price}
                                                        </span>
                                                        <span className='p-2 border border-black rounded text-black'>
                                                            <span className='font-bold'>
                                                                {product.discount_percentage}
                                                            </span>
                                                            <span className='text-red-600 font-bold '> % OFF</span>
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
    
                                                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`} alt="thumbnail" />
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <span className=" text-black font-semibold text-center">
                                                            Category : {product.category?.name}
                                                        </span>
                                                        <div className='text-black font-semibold'>
                                                            Colors : {product.color.map(
                                                                (colors, index) => {
                                                                    return <div key={index} className='flex gap-2 py-1'>
                                                                        <span className="w-[20px] h-[20px] rounded-full" style={{ backgroundColor: colors.code }}></span>{colors.name}
                                                                    </div>
                                                                }
                                                            )}
                                                        </div>
                                                    </td>
    
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <ToggleStatus current_status={product.status} endpoint={`/product/change-status/${product._id}/`} />
    
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right ">
                                                        <span className='border p-1'>
                                                            Deleted At : <br />{timeAgo(product.deletedAt)}
                                                        </span> 
                                                        
    
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                        <div className='flex gap-3'>
                                                            <DeleteBtn endpoint={`/product/delete/${product._id}`} />
                                                           <RestoreBtn endpoint={`/product/restore/${product._id}`}/>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrashProductPage;