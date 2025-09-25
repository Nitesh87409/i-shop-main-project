"use client"
import { axiosInstance } from '@/library/helper'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function ToggleStatus({current_status, endpoint}) {
    const [status,setStatus] = useState(current_status)
    const toggleStatusHandler = ()=>{
        axiosInstance.patch(endpoint + !status)
        .then(
            (response)=>{
                if(response.data.flag ==1){
                    setStatus(!status);
                    toast.success(response.data.message);
                }else{
                    toast.error(response.data.message);
                }
                
            }
        ).catch(
            (error)=>{
                toast.error(response.data.message);
            }
        )
        
        
    }
    return (
        <>
            {/* categorry status using ternery operator */}
            <span
            onClick={toggleStatusHandler}
                className={`cursor-pointer relative inline-block px-3 py-1 font-semibold leading-tight ${status
                    ? 'text-green-900'
                    : 'text-red-900'
                    }`}
            >
                <span
                    aria-hidden
                    className={`absolute inset-0 opacity-50 rounded-full ${status == 1
                        ? 'bg-green-200'
                        : 'bg-red-200'
                        }`}
                ></span>
                <span className="relative">{status ? 'Active' : 'Inactive'}</span>
            </span>

        </>
    )
}
