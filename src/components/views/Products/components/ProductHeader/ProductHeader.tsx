import { styled } from "styled-components";
import { Button } from 'antd';
import { FC } from "react";
import { TProductHeaderProps } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore/store";

const Header = styled.div({
    height: '10vh',
    margin: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
})

const ProductHeader:FC<TProductHeaderProps> = ({toggleOpenDeleteModal}) => {
    const { pickedItems } = useSelector((state: RootState) => state.products);
    return (
        <Header>
            <Button disabled={!(pickedItems.length === 1)} onClick={toggleOpenDeleteModal} danger>Аннулировать</Button>
        </Header>
    );
};

export default ProductHeader;