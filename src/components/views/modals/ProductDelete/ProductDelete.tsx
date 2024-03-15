import { FC } from "react";
import { IProductDeleteProps } from "./types";
import { Modal } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxStore/store";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchAnullProducts } from "../../../../reduxStore/products/productsSlice";


const ProductDelete: FC<IProductDeleteProps> = ({ visible, onCancel, toggleOpenDeleteModal }) => {
    const dispatch = useAppDispatch();
    const { pickedItems } = useSelector((state: RootState) => state.products);
    const onSubmitCancel = () => {
        dispatch(fetchAnullProducts());
        toggleOpenDeleteModal();
    };

    return (
        <Modal
            visible={visible}
            title='Вы уверены что хотите аннулировать товар(ы):'
            cancelText='Отклонить'
            okText='Применить'
            cancelButtonProps={{ type: 'primary', danger: true }}
            onCancel={onCancel}
            onOk={onSubmitCancel}
            bodyStyle={{ zIndex: 10000 }}
            destroyOnClose={true}
        >
            {pickedItems.map(item => item.name).join(', ')}
        </Modal>
    );
};

export default ProductDelete;