import { IProductItemsResponse } from './../../reduxStore/products/types';
import { AxiosResponse } from 'axios';
import apiInstance from '../api';

export default {
    fetchProductItems(): Promise<AxiosResponse<IProductItemsResponse[]>> {
        return apiInstance.get(`/products/items`);
    },
    fetchProductItemsTwo(): Promise<AxiosResponse<IProductItemsResponse[]>> {
        return apiInstance.get(`/products/items2`);
    },
    fetchAnullProductsOne(anulledId: number) {
        // не понял как в mockapi io передавать через '&' несколько id на удаление
        return apiInstance.delete(`/products/items/${anulledId}`);
    },
    fetchAnullProductsTwo(anulledId: number) {
        // не понял как в mockapi io передавать через '&' несколько id на удаление. Формат "/id=1&id=2" не поддерживается
        return apiInstance.delete(`/products/items2/${anulledId}`);
    },
}