import React from "react";
import {formatMoney} from "../utils/helpers";
import blank_label_red from '../assets/blank_label_red.png';
import blank_label_blue from '../assets/blank_label_blue.png';

const Product = ({productData, isNew}) => {
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <img src={productData?.thumb || 'https://i.imgur.com/3nUenJZ.jpg'} alt=''
                         className='w-[243px] h-[243px] object-cover'/>
                    <img src={isNew ? blank_label_red : blank_label_blue} alt=""
                         className={`absolute ${isNew ? 'w-[120px] top-[-32px] left-[-42px]' : 'w-[120px] top-[-32px] left-[-42px]'} object-contain`}/>
                    <span className={`font-bold top-[-10px] left-[-10px] text-white absolute ${isNew ? '' : 'text-sm'}`}>{isNew ? 'New' : 'Trending'}</span>
                </div>
                <div className='flex flex-col mt-[15px] items-start w-full gap-1'>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product