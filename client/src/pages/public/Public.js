import React from "react";
import {Outlet} from "react-router-dom"; // dùng để hiển thị nội dung của các <Route> con bên trong một <Route> cha.
import {Header, Navigation} from '../../components'

const Public = () => {
    return (
        <div className='w-full flex flex-col items-center'>
                <Header/>
                <Navigation/>
            <div className='w-main'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Public