import axios from "axios"


const apiUrl = `${import.meta.env.VITE_API_URL}/product`;

export const productList = async () => {
    try {
        const list = await axios.get(apiUrl);
        return list.data;
    } catch (error) {
        throw new Error("Error al obtener los productos");
    }
}