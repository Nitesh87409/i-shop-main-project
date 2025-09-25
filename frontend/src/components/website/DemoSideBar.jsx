<div className={` w-72 lg:col-span-1 
      sticky top-0 left-0 z-0  transform  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0`} >
                {/* Sidebar for Filters */}
                <div className="p-4 rounded-lg shadow-md !text-gray-500">
                    <h2 className="bg-gray-100 p-2 rounded-lg flex items-center text-lg font-semibold mb-4">
                        <FaFilter className="mr-2" /> Filters
                    </h2>
                    {/* Category Filter */}
                    <div className="bg-gray-100 p-2 rounded-lg mb-4">
                        <label className="font-semibold text-[18px] p-2 block">Category</label>
                        <div className='p-2'>
                            <Link href={"/store"} className='text-[14px] font-semibold p-2'>ALL</Link>
                            {
                                getCategory.map(
                                    (category, index) => {
                                        return (
                                            <ul key={index} className='first-letter:uppercase flex justify-between items-center p-2 text-[14px] font-semibold break-words'>
                                                <Link href={`/store/${category.slug}`}>
                                                    <li key={index}>{category.name}</li>
                                                </Link>
                                                <span>({category.ProductCount})</span>
                                            </ul>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                    {/* Color Filter */}
                    <ColorSelect colors={Colors ?? []} />
                    {/* Price Range Filter */}
                    <RangeSelect />
                    <div className="text-end">
                        <a href={"/store"} className='bg-red-500 text-white rounded-lg p-2 font-semibold'>Reset</a>
                    </div>
                </div>
            </div>