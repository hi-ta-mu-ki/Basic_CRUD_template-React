const baseUrl: string = "http://localhost:8000/api/auth";
import axios, { AxiosResponse, AxiosError } from "axios";

interface UpdateData {
    id: number;
    name: string;
    email: string;
    password_raw: string;
    role: number;
}

interface AddData {
    name: string;
    email: string;
    password_raw: string;
    role: number;
}

const crudApi = {
    create: async (data: AddData): Promise<any> => {
        const urlSave: string = baseUrl + "/create";
        try {
            const response: AxiosResponse = await axios.post(urlSave, data);
            return response;
        } catch (error) {
            return error;
        }
    },

    list: async (page: number): Promise<any> => {
        const urlList: string = baseUrl + "/list?page=" + page;
        try {
            const response: AxiosResponse = await axios.get(urlList);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    get: async (id: number): Promise<any> => {
        const urlGet: string = baseUrl + "/get/" + id;
        try {
            const response: AxiosResponse = await axios.get(urlGet);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    update: async (data: UpdateData): Promise<any> => {
        const urlUpdate: string = baseUrl + "/update/" + data.id;
        try {
            const response: AxiosResponse = await axios.patch(urlUpdate, data);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    delete: async (id: number): Promise<any> => {
        const urlDelete: string = baseUrl + "/delete/" + id;
        try {
            const response: AxiosResponse = await axios.delete(urlDelete);
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default crudApi;