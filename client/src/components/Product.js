import React from "react";
import {formatMoney} from "../utils/helpers";
import new_label from '../assets/new.png';
import trending_label from '../assets/trending.png';
import {renderStarFromNumber} from "../utils/helpers";

const Product = ({productData, isNew}) => {
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <img src={productData?.thumb || 'https://i.imgur.com/3nUenJZ.jpg'} alt=''
                         className='w-[243px] h-[243px] object-cover'/>
                    <img src={isNew ? new_label : trending_label} alt=""
                         className='absolute w-[100px] h-[35px] top-0 right-[0] object-cover'/>
                </div>
                <div className='flex flex-col mt-[15px] items-start w-full gap-1'>
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)}</span>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product