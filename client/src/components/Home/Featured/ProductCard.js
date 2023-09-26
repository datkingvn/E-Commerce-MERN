import React, {useState} from "react";
import {formatMoney, renderStarFromNumber} from "../../../utils/helpers";

const ProductCard = ({image, title, totalRatings, price}) => {
    return (
        <div className='w-1/3 flex-auto flex px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={image} alt="Images Product" className='w-[120px] object-contain p-4'/>
                <div className='flex flex-col mt-[15px] items-start w-full gap-1 text-xs'>
                    <span className='line-clamp-1 capitalize text-sm'>{title?.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings, 14)?.map((el, index) => <span
                        key={index}>{el}</span>)}</span>
                    <span>{`${formatMoney(price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard