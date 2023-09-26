import React, {memo} from "react";
import {Product} from "../index";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const CustomSlider = ({products, activatedTab}) => {
    return (
        <>
            <div>
                {products && <Slider {...settings}>
                    {products?.map(el => (
                        <Product key={el._id} pid={el.id} productsData={el} isNew={activatedTab !== 1}/>
                    ))}
                </Slider>}
            </div>
        </>
    )
}

export default memo(CustomSlider)