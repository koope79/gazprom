import React, {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts, setPickedItems } from '../../../reduxStore/products/productsSlice';
import { TProductItems } from '../../../reduxStore/products/types';
import { RootState } from '../../../reduxStore/store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ProductDelete from '../modals/ProductDelete/ProductDelete';
import ProductHeader from './components/ProductHeader/ProductHeader';
import ProductTable from './components/ProductTable/ProductTable';

const Products = () => {
    const dispatch = useAppDispatch();
    const { pickedItems } = useSelector((state: RootState) => state.products);
    const [openDeleteModal, setOpenDeleteModel] = useState(false);

    const toggleOpenDeleteModal = useCallback(() => {
        setOpenDeleteModel(prev => !prev);
    }, [])

    const onItemClick = useCallback((row: TProductItems) => {
        const foundItem = pickedItems.find(item => item.key === row.key);
        if (!pickedItems.length) {
          dispatch(setPickedItems([...pickedItems, row]));
        } else {
          if (!foundItem) {
            dispatch(setPickedItems([...pickedItems, row]));
          } else {
            const newItems = pickedItems.filter((item) => item.key !== row.key);
            dispatch(setPickedItems(newItems));
          }
        }
    }, [pickedItems]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <>
            <ProductHeader toggleOpenDeleteModal={toggleOpenDeleteModal} />
            <ProductTable onItemClick={onItemClick} selectedRows={pickedItems} />
            <ProductDelete visible={openDeleteModal} onCancel={toggleOpenDeleteModal} toggleOpenDeleteModal={toggleOpenDeleteModal}/>
        </>
    );
};

export default Products;