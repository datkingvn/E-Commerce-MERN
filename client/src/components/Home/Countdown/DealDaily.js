import React, {useState, useEffect, memo} from "react";
import icons from "../../../utils/icons";
import {apiGetProducts} from "../../../apis/productAPI";
import {formatMoney, renderStarFromNumber} from "../../../utils/helpers";
import {CountDown} from '../../index'

const {AiFillStar, IoMenu} = icons;

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [expiredTime, setExpiredTime] = useState(false);
    const [remainingTime, setRemainingTime] = useState({
        remainingDays: 0,
        remainingMinutes: 0,
        remainingSeconds: 0
    });

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({limit: 1, page: Math.round(Math.random() * 20)});
        if (response.success) setDealDaily(response.productsData[0]);
    };

    useEffect(() => {
        fetchDealDaily();
    }, []);

    useEffect(() => {
        let targetDate = new Date(process.env.REACT_APP_TARGET_DATE);
        const currentDate = new Date();

        if (targetDate > currentDate) {
            let timeDiff = targetDate.getTime() - currentDate.getTime();
            const interval = setInterval(() => {
                if (timeDiff > 0) {
                    const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const remainingHours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                    const remainingMinutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                    const remainingSeconds = Math.floor((timeDiff / 1000) % 60);

                    setRemainingTime({
                        remainingDays,
                        remainingHours,
                        remainingMinutes,
                        remainingSeconds
                    });

                    timeDiff = timeDiff - 1000;
                } else {
                    setExpiredTime(true);
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            setExpiredTime(true);
        }
    }, []);

    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4">
                <span className="flex-1 flex justify-center">
                    <AiFillStar size={20} color="#DD1311"/>
                </span>
                <span className="flex-8 font-semibold text-20 text-[20px] text-center text-gray-700">DAILY DEALS</span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center  px-4 gap-2">
                <img src={dealDaily?.thumb || 'https://i.imgur.com/3nUenJZ.jpg'} alt=""
                     className="w-full object-contain"/>
                <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
                <span className="flex h-4">{renderStarFromNumber(dealDaily?.totalRatings)?.map((el, index) => <span
                    key={index}>{el}</span>)}</span>
                <span>{dealDaily ? `${formatMoney(dealDaily.price)} VND` : ""}</span>
            </div>
            <div className='px-4 mt-6'>
                <div className='flex justify-center gap-2 items-center mb-4'>
                    {!expiredTime && <CountDown timeRemaining={remainingTime.remainingDays} timeUnits={'Days'}/>}
                    {!expiredTime && <CountDown timeRemaining={remainingTime.remainingHours} timeUnits={'Hours'}/>}
                    {!expiredTime && <CountDown timeRemaining={remainingTime.remainingMinutes} timeUnits={'Minutes'}/>}
                    {!expiredTime && <CountDown timeRemaining={remainingTime.remainingSeconds} timeUnits={'Seconds'}/>}
                </div>
                <button type='button'
                        className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'>
                    <IoMenu/>
                    <span>OPTIONS</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);