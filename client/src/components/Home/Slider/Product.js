import React, {useState} from "react";
import {formatMoney} from "../../../utils/helpers";
import new_label from '../../../assets/new.png';
import trending_label from '../../../assets/trending.png';
import {renderStarFromNumber} from "../../../utils/helpers";
import {SelectOption} from '../../index'
import icons from "../../../utils/icons";

const {AiFillEye, AiFillHeart, IoMenu} = icons

const Product = ({productsData, isNew}) => {
    const [isShowOption, setIsShowOption] = useState(false)
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'
                 onMouseEnter={e => {
                     e.stopPropagation(); // để ngăn chặn sự lan truyền của một sự kiện qua cây DOM (Document Object Model).
                     setIsShowOption(true)
                 }}

                 onMouseLeave={e => {
                     e.stopPropagation();
                     setIsShowOption(false)
                 }}>
                <div className='w-full relative'>
                    {isShowOption &&
                        <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                            <SelectOption icon={<AiFillHeart/>}/>
                            <SelectOption icon={<IoMenu/>}/>
                            <SelectOption icon={<AiFillEye/>}/>
                        </div>}
                    <img src={productsData?.thumb || 'https://i.imgur.com/3nUenJZ.jpg'} alt=''
                         className='w-[274px] h-[274px] object-cover'/>
                    <img src={isNew ? new_label : trending_label} alt=""
                         className='absolute w-[100px] h-[35px] top-0 right-[0] object-cover'/>
                </div>
                <div className='flex flex-col mt-[15px] items-start w-full gap-1'>
                    <span className='flex h-4'>{renderStarFromNumber(productsData.totalRatings).map((el, index) => <span
                        key={index}>{el}</span>)}</span>
                    <span className='line-clamp-1'>{productsData?.title}</span>
                    <span>{`${formatMoney(productsData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product