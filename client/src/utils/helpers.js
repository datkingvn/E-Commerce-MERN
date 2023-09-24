export const createSlug = string => string.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');

export const formatMoney = number => Number(number.toFixed(1)).toLocaleString()