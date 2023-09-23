import React, {useState, useEffect} from "react";
import {apiGetCategories} from "../apis/appAPI";

const Sidebar = () => {
    const [categories, setCategories] = useState(null)
    const fetchCategories = async () => {
        const getCategoriesResponse = await apiGetCategories();
        if (getCategoriesResponse.success) setCategories(getCategoriesResponse.productCategories)
    }
    useEffect(() => {
        return () => {
            fetchCategories()
        };
    }, []);
    // console.log(categories)
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar
