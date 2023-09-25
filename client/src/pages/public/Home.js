import React from "react";
import {Sidebar, Banner, ProductTab, DealDaily, FeaturedProducts} from '../../components';
const Home = () => {
    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar/>
                    <DealDaily/>
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner/>
                    <ProductTab/>
                </div>
            </div>
            <div className='my-8'>
                <FeaturedProducts/>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    )
}

export default Home