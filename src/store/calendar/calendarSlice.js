import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         id: '123',
//         name: 'Gonzalo'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [ 
            // tempEvent 
            
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map( (evento) => (
                (evento.id === payload.id)
                ? payload
                : evento
            ));
            state.activeEvent = null;
        },
        onDeleteEvent: (state, {payload}) => {

            if ( state.activeEvent ){
                state.events = state.events.filter( (evento) => (
                    (evento.id !== state.activeEvent.id) && evento
                ));
                state.activeEvent = null;
            }

        },
        onLoadEvents: (state, {payload  = []}) => {
            
            // state.events = payload;
            payload.forEach(event => {
                const exist = state.events.some( dbEvent => dbEvent.id === event.id );
                if (!exist){
                    state.events.push( event );
                }
            });

            state.isLoadingEvents = false; 
        },
        onLogoutCalendar: (state, {payload}) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }

    }
});

export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onLogoutCalendar
} = calendarSlice.actions;