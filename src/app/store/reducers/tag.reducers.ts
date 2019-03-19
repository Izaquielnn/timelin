import { Tag } from '../../models/tag.model';
import * as TagActions from './../actions/tag.actions';

const initialState: Tag[] = []

export function reducer(state: Tag[] = initialState, action: TagActions.Actions) {
    switch(action.type) {
        case TagActions.ADD_TAG:
            return [...state, action.payload];

        case TagActions.REMOVE_TAG:
            return state.filter(event => event.id !== action.payload.id);

        case TagActions.GET_TAGS:
            return action.payload;

        case TagActions.UPDATE_TAG:
            return state.map(event => event.id === action.payload.id? action.payload : event);
            
        default:
            return state;
    }
}