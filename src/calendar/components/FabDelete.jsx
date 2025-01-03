import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import { useEffect, useState } from "react";

export const FabDelete = () => {

    const [display, setDisplay] = useState('d-none');

    const { activeEvent, startDeleteEvent } = useCalendarStore();

    useEffect( () => {
        if ( activeEvent !== null ) {
            setDisplay('');
        }else{
            setDisplay('d-none');
        };

    }, [activeEvent]);

    const handleDelete = () => {
        startDeleteEvent();
    }

    return (
        <>
            <button className={`btn btn-danger fab-danger ${display}`} onClick={ handleDelete }>
                <i className="fas fa-trash-alt"></i>
            </button>
        </>
    );
}