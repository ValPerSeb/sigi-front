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

export const productDetails = async (id) => {
    try {
        const list = await axios.get(`${apiUrl}/${id}`);
        return list.data;
    } catch (error) {
        throw new Error("Error al obtener detalles del producto");
    }
}

export const addProduct = (data) => {
    try {
        return axios.post(apiUrl, data);
    } catch (error) {
        throw new Error("Error al crear producto");
    }
}

export const updateProduct = (id, data) => {
    try {
        return axios.put(`${apiUrl}/${id}`, data);
    } catch (error) {
        throw new Error("Error al actualizar producto");
    }
}

export const deleteProduct = async (id) => {
    try {
        const list = await axios.delete(`${apiUrl}/${id}`);
        return list.data;
    } catch (error) {
        throw new Error("Error al eliminar producto");
    }
}