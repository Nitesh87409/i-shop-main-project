"use client"

import { axiosInstance } from '@/library/helper'
import React, { useState } from 'react'
import { FaImages, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function MultipleImages({ multiImg, productName, id }) {
    const [multiImages, setMultiImages] = useState(multiImg)
    // console.log(id);

    const [flag, setFlag] = useState(false)

    const MultiSubmitHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const other_images = e.target.other_images.files;
        // console.log(other_images);

        const formdata = new FormData()
        for (let otherimages of other_images) {
            formdata.append("other_images", otherimages)
        }
        axiosInstance.post(`/product/upload-other-images/${id}`, formdata)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.message)
                        setMultiImages(response.data.other_images)

                    } else {
                        toast.error(response.data.message)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )



    }
    const DeleteImages = async (index) => {
        // console.log(index)
        // console.log(e);

        axiosInstance.delete(`/product/delete-other-images/${id}/${index}`)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.message)
                        setMultiImages(response.data.other_images)
                    } else {
                        toast.error(response.data.message)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 ${flag ? "flex" : "hidden"}  flex-col justify-center items-center z-50`}>
                <div className='bg-white shadow p-3 w-[60%] h-[60%]'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold p-2 text-black'>{productName} other images</h1>
                        <FaTimes className='cursor-pointer text-xl ml-auto' onClick={() => setFlag(false)} />
                    </div>
                    <hr />
                    {
                        multiImages.length === 0
                            ?
                            <p className='text-3xl p-3 text-center'>No images found</p>
                            :
                            <div className='flex flex-wrap gap-4'>
                                {
                                    multiImages.map(
                                        (images, index) => {
                                            return (
                                                <div key={index}>
                                                    <img key={index} src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/other_images/${images}`} alt={`other images ${index + 1}`} className='w-[150px] border p-2' />
                                                    <FaTrash className='cursor-pointer mx-auto my-3' onClick={(e) => DeleteImages(index)}   />
                                                </div>

                                            )
                                        }
                                    )
                                }
                            </div>
                    }
                </div>

                <div className='w-[60%] bg-white p-3'>
                    <form onSubmit={MultiSubmitHandler} action="" className='flex gap-4'>
                        <input multiple={true} type="file" name="other_images" id="other_images" className='w-full p-2 rounded border cursor-pointer' />
                        <button className='px-4 py-2 bg-blue-600 rounded text-white'>Upload</button>
                    </form>
                </div>
            </div>
            <FaImages className='cursor-pointer' onClick={() => setFlag(true)} />
        </>
    )
}
