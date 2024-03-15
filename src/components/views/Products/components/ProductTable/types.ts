import { TProductItems } from "../../../../../reduxStore/products/types";

export type ProductTableProps = {
    onItemClick: (row: TProductItems) => void;
    selectedRows: TProductItems[];
}