import DeleteBtn from '@/components/admin/DeleteBtn';
import MultipleImages from '@/components/admin/MultipleImages';
import PageHeader from '@/components/admin/PageHeader';
import ToggleStatus from '@/components/admin/ToggleStatus';
import { ProductData } from '@/library/api-calls'
import { timeAgo } from '@/library/helper';
import Link from 'next/link';
import React from 'react'
import { FaPenAlt } from 'react-icons/fa'
import { FaIndianRupeeSign } from 'react-icons/fa6';

export default async function Product() {

  const Products = await ProductData();

  return (
    <main className='col-span-3 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Product"]} button={{ text: "ADD", name: "Products", url: "/admin/product/add" }} trash={{ link: "/admin/product/trash" }} />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-left">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.
              </th>
              <th scope="col" className="px-6 py-3">
                Name <br />/Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                Category/Colors
              </th>
              <th scope="col" className="px-6 py-3">
                Stock / TopSelling / Status
              </th>
              <th scope="col" className="px-6 py-3">
                TimeStamps
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Products.map((product, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-black font-bold">
                      <span className='block'>Name : {product.name}</span>
                      <span className='block'>Slug : {product.slug}</span>
                    </td>
                    <td className="px-4 py-4 flex flex-col items-center gap-1">
                      <span className='line-through p-2 border border-black rounded text-black flex items-center'>
                        <FaIndianRupeeSign /> {product.orignal_price}
                      </span>
                      <span className='p-2 border border-black rounded text-blue-700 flex items-center'>
                        <FaIndianRupeeSign /> {product.discount_price}
                      </span>
                      <span className='p-2 border border-black rounded text-black'>
                        <span className='font-bold'>
                          {product.discount_percentage}
                        </span>
                        <span className='text-red-600 font-bold '>OFF</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`} alt="" />
                    </td>
                    <td className="px-6 py-4">
                      <span className=" text-black font-semibold">
                        Category : {product.category.name}
                      </span>
                      <div className='text-black font-semibold'>
                        Colors : {product.color.map(
                          (colors, index) => {
                            return <div key={index} className='flex gap-2 py-1'>
                              <span className="w-[20px] h-[20px] rounded-full" style={{ backgroundColor: colors.color_code }}></span>{colors.name}
                            </div>
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 flex flex-col gap-4">
                      <ToggleStatus
                        Yes="In_Stock"
                        No="Out_Stock"
                        currentStatus={product.stock}
                        field="stock"
                        endPoint={`/product/change-status/${product._id}`}
                      />
                      <ToggleStatus
                        Yes="Yes"
                        No="No"
                        currentStatus={product.topselling}
                        field="topselling"
                        endPoint={`/product/change-status/${product._id}`}
                      />
                      <ToggleStatus
                        Yes="Active"
                        No="Inactive"
                        currentStatus={product.status}
                        field="status"
                        endPoint={`/product/change-status/${product._id}`}
                      />
                    </td>
                    <td className='px-6 py-4 text-black font-semibold'>
                      <span>
                        CreatedAT :{timeAgo(product.createdAt)}
                      </span>
                      <span>
                        UpdatedAT :{timeAgo(product.updatedAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center text-lg">
                        <Link className='cursor-pointer' href={`${process.env.NEXT_PUBLIC_BASE_URL_ADMIN}/product/edit/${product._id}`}>
                          <FaPenAlt />
                        </Link>
                        <DeleteBtn className="cursor-pointer" endPoint={`/product/trash/${product._id}`} />
                        <MultipleImages product_id={product._id} productName={product.name} multiImg={product.other_image}/>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

    </main >
  )
}
