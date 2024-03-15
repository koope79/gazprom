import type { TableColumnsType } from 'antd';
import { sortedDate, sortedString } from '../../../../../utils/sortColumnsTable';

interface ProductsItems {
    key: React.Key;
    name: string;
    quantity: number;
    deliveryDate: string;
    price: number;
    currency: string;
}

export const productColumns = ():TableColumnsType<ProductsItems> => ([
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => sortedString(a.name, b.name)
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Дата',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      sorter: (a, b) => sortedDate(a.deliveryDate, b.deliveryDate)
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Валюта',
      dataIndex: 'currency',
      key: 'currency',
      sorter: (a, b) => sortedString(a.currency, b.currency)
    },
  ]);