"use client";
import PageHeader from "@/components/admin/PageHeader";
import { titleToSlug, axiosInstance } from "@/library/helper";
import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from 'react'
import { getCategories, getColors, getProductsbyId } from "@/library/api-calls";
import Select from 'react-select';
import Images from "@/components/admin/Images";
import { useParams, useRouter } from 'next/navigation'


const UpdateProduct = () =>  {
    const [image, setImage] = useState(null)
    const original_price = useRef(null);
    const discount_percent = useRef(null);
    const discounted_price = useRef(null);
    const [categories, setCategory] = useState([]);
    const [colors, setColor] = useState([]);
    const [product_colors, setProductColor] = useState([]);
     const router = useRouter()
      const { id } = useParams();
      const [product, setProduct] = useState(null)
      const [selectCategory, setSelectCategory] = useState(null)

      const MultiColorData = (options) => {
        setProductColor(options)
      }
      const PriceChangeHandler = () => {
        const price = original_price.current.value
        const discount = discounted_price.current.value
        if (price != 0 && discount != 0) {
          const final = ((price - discount) * 100) / price
          discount_percent.current.value = Math.round(final) + "%"
        }
      }

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
 

    const getProduct = async()=>{
        if(id !=null){
            const ProductData = await getProductsbyId(id);
            
           
            
            setSelectCategory({ value: ProductData?.category._id, label: ProductData?.category.name })
            const selectedColor = []
            for (let colors of ProductData?.color) {
              selectedColor.push({ value: colors?._id, label: colors?.name })
            }
            setProductColor(selectedColor)
             await setProduct(ProductData)
           
            
            
            
        }
    }

    useEffect(
        () => {
          getProduct()
        }, [id]
      )


       // calling name change handler to pass name input value to slug
    const nameChangeHandler = () => {


        slug.current.value = titleToSlug(name.current.value);
    }


  

   
    //useRef can be used to get a reference to an input element, allowing you to read or modify its value directly.
    const name = useRef(null);
    const slug = useRef(null);

    const [nameError, setNameError] = useState(false);


   

    //submit handler work on submit form 
    const SubmitHandler = (e) => {
        e.preventDefault();

        // Create a new FormData object to hold form data
        const formData = new FormData()
        formData.append("name", e.target.name.value)
        formData.append("slug", e.target.slug.value)
        formData.append("category", e.target.category.value)
        formData.append("color", JSON.stringify(product_colors.map(color => color.value)))
        formData.append("orignal_price", e.target.original_price.value)
        formData.append("discounted_price", e.target.discounted_price.value)
        formData.append("discount_percentage", e.target.discount_precentage.value)
        formData.append("main_image", image)


        // API call to Update Product
        axiosInstance.put(`/product/update/${id}`, formData)
           .then(
             (response) => {
               if (response.data.flag == 1) {
                 e.target.reset()
                 toast.success(response.data.message)
                 router.push("/admin/product")
               } else {
                 toast.error(response.data.message)
               }
             }
           ).catch(
             (error) => {
               toast.error(response.data.message)
             }
           )
       }

 // sending breadcrums props in Pageheader component
 const breadcrums = [
    { label: 'Home', url: '/admin' },
    { label: 'Product', url: '/admin/product' },
    { label: 'edit', url: `/admin/product/edit/${product?._id}` }
];
      

return (
    <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
            <PageHeader breadcrums={breadcrums}
                button={{ text: "Back to View", url: "/admin/product" }}
            />
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
                </div>
                <form onSubmit={SubmitHandler} className="w-full !bg-white shadow-lg p-5 text-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                              Product  Name
                            </label>
                            <input
                            defaultValue={product?.name}
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
                            defaultValue={product?.slug}
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
                            <Select name="category" onChange={option => setSelectCategory(option)} value={selectCategory} 
                             options={ 
                                categories.map(cat => {
                                    return {
                                        value: cat._id,
                                        label: cat.name
                                    }
                                })
                            } />
                        </div>
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="colors">
                                Colors
                            </label>
                            <Select value={product_colors}onChange={(options) => MultiColorData(options)} name="colors" closeMenuOnSelect={false} isMulti options={
                                colors.map(color => {
                                    return {
                                        value: color._id,
                                        label: color.name
                                    }
                                })
                            } />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-2 gap-4">
                        <div className="mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="original_price">
                                Original Price
                            </label>
                            <input
                                onChange={PriceChangeHandler}
                                ref={original_price}
                                defaultValue={product?.original_price}
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
                                onChange={PriceChangeHandler}
                                defaultValue={product?.discounted_price}
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
                                defaultValue={product?.discount_percentage}
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
              
            </div>
        </div>
    </div>
);
};

export default UpdateProduct;
