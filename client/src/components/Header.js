import React from "react";
import logo from '../assets/logo.png'
import icons from "../utils/icons";
import {Link} from 'react-router-dom';
import path from "../utils/path";

const Header = () => {
    const {BsFillTelephoneFill, MdEmail, FaUserCircle, BsHandbagFill} = icons
    return (
        <div className='border w-main flex justify-between h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[234px] object-contain'/>
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <BsFillTelephoneFill color='#EF3131'/>
                        <span className='font-semibold'>(+1800) 000 8808</span>
                    </span>
                    <span>
                        <span>Mon-Sat 9:00AM - 8:00PM</span>
                    </span>
                </div>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdEmail color='#EF3131'/>
                        <span className='font-semibold'>SUPPORT@DVFB.VN</span>
                    </span>
                    <span>
                        <span>Online Support 24/7</span>
                    </span>
                </div>
                <div className='flex items-center justify-center gap-2 px-4 border-r'>
                    <BsHandbagFill color='#EF3131'/>
                    <span>0 item(s)</span>
                </div>
                <div className='flex items-center justify-center px-6'><FaUserCircle size={24}/></div>
            </div>
        </div>
    )
}

export default Header
