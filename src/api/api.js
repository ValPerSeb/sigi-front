import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCRUDService = (endpoint) => ({
  list: async (filters = {}) => {
    try {
      const res = await apiClient.get(`/${endpoint}`, { params: filters });
      return res.data;
    } catch (error) {
      throw new Error(error.message || `Error al obtener ${endpoint} list`);
    }
  },

  details: async (id) => {
    try {
      const res = await apiClient.get(`/${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || `Error al obtener detalles de ${endpoint}`);
    }
  },

  add: async (data) => {
    try {
      const res = await apiClient.post(`/${endpoint}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.message || `Error al crear ${endpoint}`);
    }
  },

  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.message || `Error al actualizar ${endpoint}`);
    }
  },

  remove: async (id) => {
    try {
      const res = await apiClient.delete(`/${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.message || `Error al eliminar ${endpoint}`);
    }
  },
});
