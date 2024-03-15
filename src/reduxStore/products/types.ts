export interface IProductItemsResponse {
    id: string;
    name: string;
    quantity: number;
    deliveryDate: number;
    price: number;
    currency: string;
}

export type TProductItems = Omit<IProductItemsResponse, 'deliveryDate'> & {
    key: number;
    deliveryDate: string;
    itemType: string;
}