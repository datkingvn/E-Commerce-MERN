import icons from "./icons";

const {AiOutlineStar, AiFillStar, BiSolidStarHalf} = icons
export const createSlug = string => string.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
    if (!Number(number)) return
    const fullStars = Math.floor(number); // Số nguyên của số sao
    const hasHalfStar = number % 1 !== 0; // Kiểm tra xem có cần hiển thị nửa sao hay không
    // 4 sao => [1,1,1,1,0] (1 là sao sáng, 0 là sao white)
    // 2 sao => [1,1,0,0,0]
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<AiFillStar color="orange" size={size || 16} />);
    if (hasHalfStar) stars.push(<BiSolidStarHalf color="orange" />); // Thêm nửa sao
    for (let i = stars.length; i < 5; i++) stars.push(<AiOutlineStar color="orange" size={size || 16} />);
    return stars;
}