import SiderBar from '@/components/website/SiderBar';
import { getCategories, getColors } from '@/library/api-calls';
import React from 'react';

export default async function Storelayout({ children }) {
    const getCategory = await getCategories();
    const Colors = await getColors();

    return (
        <div className="max-w-[1250px] mx-auto p-2 grid grid-cols-4 gap-4 relative">
            {/* Sidebar */}
            <SiderBar getCategory={getCategory} Colors={Colors} />

            {/* Main Content */}
            <div className="col-span-4 lg:col-span-3">
                {children}
            </div>
        </div>
    );
}