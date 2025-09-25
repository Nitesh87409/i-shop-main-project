"use client";

import { axiosInstance } from '@/library/helper'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify';

export default function DeleteBtn({ endpoint }) {
    const router = useRouter();
    const deleteHandler = async () => {

       await axiosInstance.delete(endpoint)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        // console.log(endpoint);
                        
                       router.refresh();
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }

                }
            ).catch(
                (error) => {
                    toast.error(response.data.message);

                }
            )
    }

    return (
        <>
            <FaTrashAlt onClick={deleteHandler} />
        </>
    )
}
