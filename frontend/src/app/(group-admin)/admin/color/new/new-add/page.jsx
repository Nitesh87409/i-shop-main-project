"use client";
import PageHeader from "@/components/admin/PageHeader";
import { titleToSlug, axiosInstance } from "@/library/helper";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useState } from "react";


const AddColor = () => {


    // sending breadcrums props in Pageheader component
    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Color', url: '/admin/color' },
        { label: 'Add', url: '/admin/color/add' }
    ];
    //useRef can be used to get a reference to an input element, allowing you to read or modify its value directly.
    const name = useRef(null);
    const slug = useRef(null);
    const color_code = useRef(null)
    const Hex_code = useRef(null)

    const [nameError, setNameError] = useState(false);


    // calling name change handler to pass name input value to slug
    const ColorExists = () => {
        axiosInstance.get(`/color/color-exists/${name.current.value}`)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        setNameError(true)
                    } else {
                        setNameError(false)
                    }
                }
            ).catch(
                () => {
                    toast.error("Internal Server Error")
                }
            )
        Hex_code.current.value = color_code.current.value
        slug.current.value = titleToSlug(name.current.value)
    }

    //submit handler work on submit form 
    const SubmitHandler = (e) => {
        e.preventDefault()
        const data = {
            name: name.current.value.trim().toUpperCase(),
            slug: slug.current.value.trim(),
            color_code: color_code.current.value.trim()
        }

        axiosInstance.post(`/color/create`, data)
            .then(
                (res) => {
                    if (res.data.flag == 1) {
                        e.target.reset();
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
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <PageHeader breadcrums={breadcrums}
                    button={{ text: "Back to View", url: "/admin/color" }}
                />
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800">Add New color</h2>
                    </div>
                    <form onSubmit={SubmitHandler} className="w-full !bg-white shadow-lg p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                    color Name
                                </label>
                                <input
                                    onChange={ColorExists}
                                    ref={name}
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
                                    color Slug
                                </label>
                                <input
                                    ref={slug}
                                    readOnly={true}
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Enter color slug"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                                    color Code
                                </label>
                                <input
                                    onChange={ColorExists}
                                    type="color"
                                    name='color_code'
                                    ref={color_code}
                                    id='color_code'
                                    placeholder='Enter color_code'
                                    className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded leading-tight focus:border-gray-500 w-full'
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="Hex_code" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2 cursor-pointer'>Hex_code</label>
                                <input
                                    type="text"
                                    readOnly={true}
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
                                Add Color
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddColor;
