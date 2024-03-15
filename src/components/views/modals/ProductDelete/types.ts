import {ModalProps} from "antd/es/modal";

export interface IProductDeleteProps extends ModalProps {
    toggleOpenDeleteModal: () => void;
}