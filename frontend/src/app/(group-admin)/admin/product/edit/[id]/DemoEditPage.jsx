"use client"

import PageHeader from '@/components/admin/PageHeader'
import { CategoryData, ColorData, getProductByID } from '@/library/api-calls'
import { axiosInstance, titleToSlug } from '@/library/helper'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import Images from '@/components/admin/Images'
import { useParams, useRouter } from 'next/navigation'

export default function UpdateProduct() {
  const [image, setImage] = useState(null)
  const name = useRef(null)
  const slug = useRef(null)
  const orignal_price = useRef(null)
  const discount_price = useRef(null)
  const discount_percentage = useRef(null)
  const [nameError, setNameError] = useState(false)
  const [category, setCategory] = useState([])
  const [colors, setColors] = useState([])
  const [productColors, setProductColors] = useState([])
  const router = useRouter()
  const { id } = useParams();
  const [product, setProduct] = useState(null)
  const [selectCategory, setSelectCategory] = useState(null)


  const MultiColorData = (options) => {
    setProductColors(options)
  }

  const PriceChangeHandler = () => {
    const price = orignal_price.current.value
    const discount = discount_price.current.value
    if (price != 0 && discount != 0) {
      const final = ((price - discount) * 100) / price
      discount_percentage.current.value = Math.round(final) + "%"
    }
  }

  const getData = async () => {
    const categoriesData = await CategoryData()
    setCategory(categoriesData)
    const colorsData = await ColorData()
    setColors(colorsData)
  }


  useEffect(
    () => {
      getData()
    }, []
  )

  const getProduct = async () => {
    if (id != null) {
      const ProductData = await getProductByID(id)
      setSelectCategory({ value: ProductData?.category._id, label: ProductData?.category.name })
      const selectedColor = []
      for (let colors of ProductData?.color) {
        selectedColor.push({ value: colors?._id, label: colors?.name })
      }
      setProductColors(selectedColor)
      setProduct(ProductData)
    }
  }

  useEffect(
    () => {
      getProduct()
    }, [id]
  )


  const NameChangeHandler = () => {
    slug.current.value = titleToSlug(name.current.value)
  }

  const SubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("name", e.target.name.value)
    formData.append("slug", e.target.slug.value)
    formData.append("category", e.target.category.value)
    formData.append("color", JSON.stringify(productColors.map(color => color.value)))
    formData.append("orignal_price", e.target.orignal_price.value)
    formData.append("discount_price", e.target.discount_price.value)
    formData.append("discount_percentage", e.target.discount_percentage.value)
    formData.append("image", image)


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


  return (
    <main className='min-h-screen col-span-4 rounded-md bg-white p-6'>
      <PageHeader breadcurms={["Dashboard", "Product", "Edit"]} button={{ text: "Back To View", name: "Update Product", url: "/admin/product" }} />
      <div className="p-5 bg-white shadow-lg rounded-lg">
        <form onSubmit={SubmitHandler} className='w-full'>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mb-2">
              <label htmlFor="name" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Product Name</label>
              <input
                onChange={NameChangeHandler}
                ref={name}
                defaultValue={product?.name}
                type="text"
                name='name'
                id='name'
                placeholder='Enter Product Name'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="slug" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Product Slug</label>
              <input
                type="text"
                name='slug'
                ref={slug}
                defaultValue={product?.slug}
                readOnly={true}
                id='slug'
                placeholder='Enter Product Slug'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className="mb-2">
              <label htmlFor="category" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Category</label>
              <Select onChange={option => setSelectCategory(option)} value={selectCategory} name='category'
                options={category.map(cat => {
                  return {
                    value: cat._id,
                    label: cat.name
                  }
                }
                )}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="color" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Color</label>
              <Select value={productColors} onChange={options => MultiColorData(options)} name='color' closeMenuOnSelect={false} isMulti
                options={colors.map(color => {
                  return {
                    value: color._id,
                    label: color.name
                  }
                }
                )}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className="mb-2">
              <label htmlFor="orignal_price" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Orignal Price</label>
              <input
                onChange={PriceChangeHandler}
                ref={orignal_price}
                defaultValue={product?.orignal_price}
                type="number"
                name='orignal_price'
                id='orignal_price'
                placeholder='Enter Product orignal_price'
                className='appearance-none bg-gray-300 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="discount_price" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Discount Price</label>
              <input
                onChange={PriceChangeHandler}
                defaultValue={product?.discount_price}
                type="number"
                name='discount_price'
                ref={discount_price}
                id='discount_price'
                placeholder='Enter Product discount_price'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
            <div className="mb-2">
              <label htmlFor="discount_percentage" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Discount Percentage</label>
              <input
                type="text"
                readOnly={true}
                defaultValue={product?.discount_percentage}
                name='discount_percentage'
                ref={discount_percentage}
                id='discount_percentage'
                className='appearance-none bg-gray-200 text-gray-700 block border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-gray-500 w-full'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='mb-2'>
              <label htmlFor="image" className='uppercase block tracking-wide text-gray-700 text-md font-bold mb-2'>Upload Image</label>
              {
                product != null
                &&
                <Images imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product?.main_image}`} name="image" onImageSelect={(img) => setImage(img)} isMulti={false} />
              }
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={nameError} type='submit' className='p-2 bg-blue-500 rounded text-white focus:shadow-outline focus:outline-none disabled:opacity-[0.3]'>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
