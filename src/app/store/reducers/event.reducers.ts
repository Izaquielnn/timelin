import { Event } from '../../models/event.model';
import * as EventActions from './../actions/event.actions';

const initialState: Event[] = []

export function reducer(state: Event[] = initialState, action: EventActions.Actions) {
    switch(action.type) {
        case EventActions.ADD_EVENT:
            return [...state, action.payload]
                .sort((eventA, eventB) => eventA.date >= eventB.date? -1: 1);

        case EventActions.REMOVE_EVENT:
            return state.filter(event => event.id !== action.payload.id)
                .sort((eventA, eventB) => eventA.date >= eventB.date? -1: 1);

        case EventActions.GET_EVENTS:
            return action.payload.sort((eventA, eventB) => eventA.date >= eventB.date? -1: 1);

        case EventActions.UPDATE_EVENT:
            return state.map(event => event.id === action.payload.id? action.payload : event)
                .sort((eventA, eventB) => eventA.date >= eventB.date? -1: 1);
        default:
            return state;
    }
}