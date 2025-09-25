import ProductCard from '@/components/website/ProductCard';
import { getProducts } from '@/library/api-calls';
import React from 'react';
import Corousel from "@/assest/images/2_corousel.png";
import Corousel1 from "@/assest/images/3_Corousel.png";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

const HomePage = async () => {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-6 py-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to iSHOP</h1>
                    <p className="mt-4 text-gray-600">Find the best products at the best prices</p>
                </div>
                <div className='overflow-hidden'>
                    <section
                        className="w-full h-[500px] hidden sm:block relative"
                        style={{
                            background:
                                "linear-gradient(67deg, #E71D3A 0%, #ECC7C1 45%, #EFCAC4 58%, #E4BDB8 70%, #42A8FE 100%)",
                        }}
                    >
                        <div className=" absolute bottom-0 left-[55%]">
                            <Image height={500} src={Corousel} alt={"2_corousel"} />
                        </div>
                    </section>
                    <section
                        className="w-full h-[600px] sm:hidden relative"
                        style={{ background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(64,64,64,1) 96%, rgba(64,64,64,1) 98%)" }}
                    >
                        <div className=" absolute bottom-0 left-8 " >
                            <Image src={Corousel1} width={400} alt={"2_corousel"} />
                        </div>
                    </section>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example product card */}
                    {
                        products?.length > 0
                            ?
                            products?.map(
                                (prod) => {

                                    return (
                                        <ProductCard key={prod._id} {...prod} />
                                    )
                                }
                            )
                            :
                            <span className='text-4xl text-gray-500 col-span-3 text-center mt-4'>No Products</span>

                    }
                </div>
            </main>
        </div>
    );
};

export default HomePage;