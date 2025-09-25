"use client"

import { axiosInstance } from '@/library/helper'
import React, { useState } from 'react'
import { FaImages, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function DemoMultipleImages({ multiImg, productName, product_id }) {
    const [multiImages, setMultiImages] = useState(multiImg)
    const [flag, setFlag] = useState(false)

    const RemoveImage = (index)=>{
        axiosInstance.delete(`/product/delete-other-image/${product_id}/${index}`)
        .then(
            (response)=>{
                if(response.data.flag == 1){
                    toast.success(response.data.message)
                    setMultiImages(response.data.other_images)
                }
                else{
                    toast.error(response.data.message)
                }
            }
        ).catch(
            (error)=>{
                toast.error(response.data.message)
            }
        )
    }

    const MultiSubmitHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const other_images = e.target.other_images.files;
        const formdata = new FormData()
        for (let otherimages of other_images) {
            formdata.append("other_images", otherimages)
        }
        const id = product_id
        await axiosInstance.post(`/product/upload-other-images/${id}`, formdata)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.message)
                        setMultiImages(response.data.other_images)
                        e.target.reset()
                    }
                }
            ).catch(
                (error) => {
                    toast.error(response.data.message)
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
                            <div className='flex gap-4 flex-wrap h-[100%] overflow-x-hidden overflow-y-scroll'>
                                {
                                    multiImages.map(
                                        (images, index) => {
                                            return (
                                                <div key={index} className='rounded border p-2 flex items-start gap-1 max-h-[200px] mt-1'>
                                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/other-images/${images}`} alt="Other_images" className='w-[155px]' />
                                                    <FaTrash className='cursor-pointer' onClick={() => RemoveImage(index)}/>
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
                        <button type='submit' className='px-4 py-2 bg-blue-600 rounded text-white'>Upload</button>
                    </form>
                </div>
            </div>
            <FaImages className='cursor-pointer' onClick={() => setFlag(true)} />
        </>
    )
}
