import React, {useEffect, useState} from "react";
import {apiGetProducts} from "../../../apis";
import {CustomSlider} from "../../index";
import {getNewProducts} from "../../../store/products/createAsyncThunk";
import {useDispatch, useSelector} from "react-redux";

const tabs = [
    {id: 1, name: 'Best Seller'},
    {id: 2, name: 'New Arrivals'}
];

const ProductTab = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [activatedTab, setActivatedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const {newProducts} = useSelector(state => state.products)

    const fetchProducts = async () => {
        const response = await apiGetProducts({sort: '-sold'});
        if (response.success) {
            setBestSellers(response.productsData);
            setProducts(response.productsData)
        }
    };

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts()) // Gửi action để lấy danh sách sản phẩm mới
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
                          className={`font-semibold uppercase px-8 border-r text-gray-400 cursor-pointer ${activatedTab === el.id ? 'text-gray-900' : ''}`}
                          onClick={() => setActivatedTab(el.id)}>{el.name}</span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-t-2 pt-4 border-main'>
                <CustomSlider products={products} activatedTab={activatedTab}/>
            </div>
            <div className='w-full flex gap-4 mt-4'>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner' className='flex-1 object-contain'/>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner' className='flex-1 object-contain'/>
            </div>
        </div>
    )
}
export default ProductTab