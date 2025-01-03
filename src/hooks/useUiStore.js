import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const { isDateModalOpen } = useSelector( state => state.ui);
    const dispatch = useDispatch();


     const openDateModal = () => {
        dispatch( onOpenDateModal() );
     }

     const closeDateModal = () => {
        dispatch( onCloseDateModal() );
     }

     const toggleDateModal = () => {
        (isDateModalOpen)
        ? dispatch( openDateModal )
        : dispatch ( closeDateModal )
     }


    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    }

}