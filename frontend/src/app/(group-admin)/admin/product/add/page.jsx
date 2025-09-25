"use client";
import PageHeader from "@/components/admin/PageHeader";
import { titleToSlug, axiosInstance } from "@/library/helper";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { getCategories, getColors } from "@/library/api-calls";
import Select from 'react-select';
import Images from "@/components/admin/Images";


const AddCategory = () =>  {
    const [image, setImage] = useState(null)
    const original_price = useRef(null);
    const discount_percent = useRef(null);
    const discounted_price = useRef(null);
    const [categories, setCategory] = useState([]);
    const [colors, setColor] = useState([]);
    const [product_colors, setProductColor] = useState([]);



    const getData = async () => {
        const categoryData = await getCategories();
        setCategory(categoryData);
        const colorData = await getColors();
        setColor(colorData);
    }
    useEffect(
        () => {
            getData();
        }, []
    )


    // colorChangeHandler store all options value in id send to productcolor state and futher this product color send to data then axios create api it will create product data in backend
    const colorChangeHandler = async (options) => {
        // console.log(options);
        const ids =   options.map(opt => opt.value);
        // console.log(ids);
         setProductColor(ids);

        
        

    }

    const priceChangeHandler = () => {
        const original_price_data = original_price.current.value;
        const discounted_price_data = discounted_price.current.value;
        // const discount_percent = discount_percent.current.value;
        if (original_price_data != 0 && discounted_price_data != 0) {
            const percent = ((original_price_data - discounted_price_data) * 100) / original_price_data;
            discount_percent.current.value = Math.round(percent) + "%";
        }

    }

    // sending breadcrums props in Pageheader component
    const breadcrums = [
        { label: 'Home', url: '/admin' },
        { label: 'Product', url: '/admin/product' },
        { label: 'Add', url: '/admin/product/add' }
    ];
    //useRef can be used to get a reference to an input element, allowing you to read or modify its value directly.
    const name = useRef(null);
    const slug = useRef(null);

    const [nameError, setNameError] = useState(false);


    // calling name change handler to pass name input value to slug
    const nameChangeHandler = () => {
        // axiosInstance help in to base use url in link 
        // axiosInstance.get(`/category/category-exists/${name.current.value}`)
        //     .then(
        //         (response) => {
        //             if (response.data.flag == 0) {
        //                 setNameError(true);
        //             } else {
        //                 setNameError(false);
        //             }
        //         }
        //     ).catch(
        //         (error) => {
        //             console.log(error);
        //         }
        //     )


        slug.current.value = titleToSlug(name.current.value);
    }

    //submit handler work on submit form 
    const SubmitHandler = (e) => {
        e.preventDefault();

        // Create a new FormData object to hold form data
        const formData = new FormData()
        formData.append("name", e.target.name.value)
        formData.append("slug", e.target.slug.value)
        formData.append("category", e.target.category.value)
        formData.append("color", JSON.stringify(product_colors))
        formData.append("orignal_price", e.target.original_price.value)
        formData.append("discounted_price", e.target.discounted_price.value)
        formData.append("discount_percentage", e.target.discount_precentage.value)
        formData.append("main_image", image)


        // API call to add Product
        axiosInstance.post(`/product/create`, formData)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        e.target.reset();
                        toast.success(response.data.message);
                    } else {
                        toast.error(response.data.message);
                    }
                }
            ).catch(
                (error) => {
                    console.log(error.message);
                    // console.log(error);
                }
            )
    }




return (
    <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
            <PageHeader breadcrums={breadcrums}
                button={{ text: "Back to View", url: "/admin/product" }}
            />
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
                </div>
                <form onSubmit={SubmitHandler} className="w-full !bg-white shadow-lg p-5 text-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                onChange={nameChangeHandler}
                                ref={name}
                                type="text"
                                id="name"
                                name="name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Enter product name"
                            />
                            <span className="text-red-500">
                                {nameError && "Product name already exists"}
                            </span>
                        </div>
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                                Slug
                            </label>
                            <input
                                ref={slug}
                                readOnly={true}
                                type="text"
                                id="slug"
                                name="slug"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Enter product slug"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                Category
                            </label>
                            <Select name="category" options={
                                categories.map(cat => {
                                    return {
                                        value: cat._id,
                                        label: cat.name
                                    }
                                })
                            } />
                            {/* <select name="" id="">
                                    <option value="">Select a category</option>
                                    {
                                        categories.map(
                                            (cat) => {
                                                return <option value={cat._id}>{cat.name}</option>
                                            }
                                        )
                                    }
                                </select> */}
                        </div>
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="colors">
                                Colors
                            </label>
                            <Select onChange={(options) => colorChangeHandler(options)} name="colors" closeMenuOnSelect={false} isMulti options={
                                colors.map(color => {
                                    return {
                                        value: color._id,
                                        label: color.name
                                    }
                                })
                            } />
                            {/* <select name="" id="">
                                    <option value="">Select colors</option>
                                    {
                                        colors.map(
                                            (color) => {
                                                return <option value={color._id}>{color.name}</option>
                                            }
                                        )
                                    }
                                </select> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-2 gap-4">
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="original_price">
                                Original Price
                            </label>
                            <input
                                onChange={priceChangeHandler}
                                ref={original_price}
                                type="number"
                                id="original_price"
                                name="original_price"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Enter original price"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="discounted_price">
                                Discounted Price
                            </label>
                            <input
                                onChange={priceChangeHandler}
                                ref={discounted_price}
                                type="number"
                                id="discounted_price"
                                name="discounted_price"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Enter discounted price"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="discount_precentage">
                                Discount Precentage
                            </label>
                            <input
                                readOnly={true}
                                ref={discount_percent}
                                type="text"
                                id="discount_precentage"
                                name="discount_precentage"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
            <div className='mb-2'>
              <label htmlFor="image" className='uppercase block tracking-wide text-gray-700 text-xs font-bold mb-2'>Upload Image</label>
              <Images name="image" onImageSelect={setImage} isMulti={false} />
            </div>
          </div>
                    <div className="flex justify-end">
                        <button
                            disabled={nameError}
                            type="submit"
                            className="shadow bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-6 rounded disabled:opacity-[0.3]"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
                {/* <form onSubmit={SubmitHandler} className="w-full !bg-white shadow-lg p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                    Product Name
                                </label>
                                <input
                                    onChange={nameChangeHandler}
                                    ref={name}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Enter Product name"
                                />
                                <span className="text-red-500">
                                    {nameError && "Category name already exists"}
                                </span>
                            </div>
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                                    Product Slug
                                </label>
                                <input
                                    ref={slug}
                                    readOnly={true}
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Enter Product slug"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="categoryname">
                                    Category Name
                                </label>
                                <input
                                    onChange={nameChangeHandler}
                                    ref={name}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Enter Product name"
                                />
                                <span className="text-red-500">
                                    {nameError && "Category name already exists"}
                                </span>
                            </div>
                            <div className="mb-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                                    Product Slug
                                </label>
                                <input
                                    ref={slug}
                                    readOnly={true}
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Enter Product slug"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={nameError}
                                type="submit"
                                className="shadow bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-6 rounded disabled:opacity-[0.3]"
                            >
                                Add Category
                            </button>
                        </div>
                    </form> */}
            </div>
        </div>
    </div>
);
};

export default AddCategory;
