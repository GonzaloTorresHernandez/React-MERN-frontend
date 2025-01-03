import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        try {

            if (calendarEvent.id) {
                //actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            //nuevo registro
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.message, 'error');
        }
    }

    const startDeleteEvent = async () => {
        try {

            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch(onDeleteEvent());
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.message, 'error');
        }

    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log(error);
        }
    }


    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,
    }

}