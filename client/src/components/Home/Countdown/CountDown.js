import React, {memo} from "react";

const CountDown = ({timeRemaining, timeUnits}) => {
  return (
      <div className='w-[30%] h-[60px] flex items-center justify-center bg-[#F4F4F4] rounded-sm flex-col'>
        <span className='text-[18px] text-gray-800'>{timeRemaining}</span>
        <span className='text-xs text-gray-700'>{timeUnits}</span>
      </div>
  )
}

export default memo(CountDown)