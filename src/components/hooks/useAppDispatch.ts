import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxStore/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();