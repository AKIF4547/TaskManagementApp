import { store } from "./redux/store";
import { useDispatch , useSelector } from "react-redux";
import { actionsApi} from "./redux/actionsApi";

const useSharedDispatch = () => useDispatch();
const useSharedSelector = useSelector;

export {
    store,
    useSharedDispatch,
    useSharedSelector,
    actionsApi
}