"use client"

import PageHeader from '@/components/admin/PageHeader'
import { GetColorByID } from '@/library/api-calls'
import { axiosInstance } from '@/library/helper'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function EditColor() {
  const name = useRef(null)
  const code = useRef(null)
  const slug = useRef(null)
  const Hex_code = useRef(null)
  const [nameError,setNameError] = useState(false)
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [color,setColor] = useState({});


  const breadcrums = [
    { label: 'Home', url: '/admin' },
    { label: 'Colors', url: '/admin/color' },
    { label: 'Edit', url: '/admin//edit' },
];

  const FetchColorData = async () =>{
    const data = await GetColorByID(id)
    console.log(data);
    
    setColor(data)
  }

  useEffect(
    ()=>{
      FetchColorData()
    },[id]
  )

  const NameChangeHandler = () => {
    axiosInstance.get(`/color/color-exists/${name.current.value}`)
    .then(
      (response)=>{
        if(response.data.flag == 0){
          setNameError(true)
        }else{
          setNameError(false)
        }
      }
    ).catch(
      ()=>{
        toast.error("Internal Server Error")
      }
    )
    Hex_code.current.value = code.current.value
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: name.current.value,
      code: code.current.value
    }
    axiosInstance.put(`/color/update/${id}`, data)
      .then(
        (res) => {
          if (res.data.flag == 1) {
            router.push("/admin/color")
            toast.success(res.data.message)
          } else {
            toast.error(res.data.message)
          }
        }
      ).catch(
        (err) => {
          toast.error("Internal Server Error")
        }
      )
      
  }

  return (
    <>
    
    
    {/* <main className='min-h-screen col-span-3 rounded-md bg-white p-6'>
      <PageHeader breadcrums={["Dashboard", "color", "Edit"]} button={{ text: "Back To View", name: "Edit Color", url: "/admin/color" }} />
      <div className="p-5 bg-white shadow-lg rounded-ee-lg">
        <form onSubmit={SubmitHandler} className='w-full'>
          <div className='grid grid-cols-3 gap-4'>
            <div className="mb-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color Name</label>
              <input
                onChange={NameChangeHandler}
                ref={name}
                defaultValue={color.name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Category Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
              <span className={`${nameError == true ? "text-red-600" : "text-transparent"}`}>
                Color Already Exists
              </span>
            </div>
            <div className="mb-2">
              <label htmlFor="code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>code</label>
              <input
                onChange={NameChangeHandler}
                type="color"
                name='code'
                ref={code}
                defaultValue={color.code}
                id='code'
                placeholder='Enter code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="hex_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>hex_code</label>
              <input
                type="text"
                name='hex_code'
                ref={Hex_code}
                defaultValue={color.code}
                id='code'
                placeholder='Enter hex_code'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              Update Color
            </button>
          </div>
        </form>
      </div>
    </main> */}

    <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <PageHeader breadcrums={breadcrums}
                        button={{ text: "Back to View", url: "/admin/color" }}
                    />
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Color</h2>
                        </div>
                        <form onSubmit={SubmitHandler} className="w-full !bg-white shadow-lg p-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                        color Name
                                    </label>
                                    <input
                                       onChange={NameChangeHandler}
                                       ref={name}
                                       defaultValue={color.name}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="Enter color name"
                                    />
                                    <span className="text-red-500">
                                        {nameError && "color name already exists"}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                                        color Code
                                    </label>
                                    <input
                                       onChange={NameChangeHandler}
                                        type="color"
                                        name='code'
                                        defaultValue={color.code}
                                        ref={code}
                                        id='code'
                                        placeholder='Enter code'
                                        className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded leading-tight focus:border-gray-500 w-full'
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="Hex_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2 cursor-pointer'>Hex_code</label>
                                    <input
                                        type="text"
                                        readOnly={true}
                                        defaultValue={color.code}
                                        name='Hex_code'
                                        ref={Hex_code}
                                        id='Hex_code'
                                        placeholder='Enter Hex_code'
                                        className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    disabled={nameError}
                                    type="submit"
                                    className="shadow bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-6 rounded disabled:opacity-[0.3]"
                                >
                                    Update Color
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    </>
  )
}
