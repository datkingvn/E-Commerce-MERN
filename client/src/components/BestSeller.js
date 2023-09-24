import React, {useEffect, useState} from "react";
import {apiGetProducts} from "../apis/productAPI";
import {Product} from "./index";
import Slider from "react-slick";

const tabs = [
    {id: 1, name: 'Best Seller'},
    {id: 2, name: 'New Arrivals'}
];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activatedTab, setActivatedTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-createdAt'})]); // Sử dụng Promise.all tất cả các hàm bất đồng bộ sẽ được gọi cùng 1 lúc
        if (response[0]?.success) {
            setBestSellers(response[0].productData);
            setProducts(response[0].productData)
        }
        if (response[1]?.success) setNewProducts(response[1].productData);
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    useEffect(() => {
        if (activatedTab === 1) setProducts(bestSellers);
        if (activatedTab === 2) setProducts(newProducts);
    }, [activatedTab]);

    return (
        <div>
            <div className='flex text-[20px] pb-4 ml-[-32px]'>
                {tabs.map(el => (
                    <span key={el.id}
                          className={`font-semibold capitalize px-8 border-r text-gray-400 cursor-pointer ${activatedTab === el.id ? 'text-gray-900' : ''}`}
                          onClick={() => setActivatedTab(el.id)}>{el.name}</span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-t-2 pt-4 border-main'>
                <Slider {...settings}>
                    {products?.map(el => (
                        <Product key={el.id} productData={el} isNew={activatedTab !== 1}/>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
export default BestSeller