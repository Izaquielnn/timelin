import { Event } from '../../models/event.model';
import * as EventActions from './../actions/event.actions';

const initialState: Event[] = []

export function reducer(state: Event[] = initialState, action: EventActions.Actions) {
    switch(action.type) {
        case EventActions.ADD_EVENT:
            return [...state, action.payload];

        case EventActions.REMOVE_EVENT:
            return state.filter(event => event.id !== action.payload.id);

        case EventActions.GET_EVENTS:
            return action.payload;

        case EventActions.UPDATE_EVENT:
            return state.map(event => event.id === action.payload.id? action.payload : event);
            
        default:
            return state;
    }
}