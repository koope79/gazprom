import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import ProductsService from '../../services/ProductsService/ProductsService';
import { RootState } from '../store';
import { TProductItems } from './types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setIsLoadingProducts(true));
      const response = await Promise.all([ProductsService.fetchProductItems(), ProductsService.fetchProductItemsTwo()]);
      const itemsData = response.map(items => items.data);
      return itemsData;
    } catch (e) {
      return rejectWithValue([]);
    } finally {
      dispatch(setIsLoadingProducts(false));
    }
  },
);

export const fetchAnullProducts = createAsyncThunk(
  'products/fetchAnullProducts',
  async (_, {getState, dispatch}) => {
    const {pickedItems} = (getState() as RootState).products;
    try {
      dispatch(setIsAnullProducts(true));
      const productIds = pickedItems.map(item => ({id: +item.id, type: item.itemType}));
      // не понял как в mockapi io передавать через '&' несколько id на удаление. Формат "/id=1&id=2" не поддерживается
      if (productIds[0].type === 'itemType0') {
        await ProductsService.fetchAnullProductsOne(productIds[0].id);
      }
      else if (productIds[0].type === 'itemType1') {
        await ProductsService.fetchAnullProductsTwo(productIds[0].id);
      }
      await dispatch(fetchProducts());
    } catch (e) {
    } finally {
      dispatch(resetPickedItems());
      dispatch(setIsAnullProducts(false));
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as TProductItems[],
    isLoadingProducts: false,
    isAnullProducts: false,
    pickedItems: [] as TProductItems[],
  },
  reducers: {
    setIsLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload;
    },
    setIsAnullProducts: (state, action) => {
      state.isAnullProducts = action.payload;
    },
    setPickedItems: (state, action: PayloadAction<TProductItems[]>) => {
      state.pickedItems = action.payload;
    },
    resetPickedItems: (state) => {
      state.pickedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const items = action.payload;
      if(items.length > 0) {
        const mas = items.map((arrItems, ind) => (arrItems.map(item => ({
          ...item,
          itemType: `itemType${ind}`,
          deliveryDate: moment(new Date(item.deliveryDate * 1000)).format('DD.MM.YYYY').toString() 
        }))));
        const transformData = mas.flat()
          .map((item, ind) => ({
            ...item, key: ind
          }))
          .sort((a, b) => a.price - b.price);
        state.products = transformData;
      }
  });
  },
});

export const {
  setIsLoadingProducts,
  setIsAnullProducts,
  setPickedItems,
  resetPickedItems
} = productsSlice.actions;
export default productsSlice;
