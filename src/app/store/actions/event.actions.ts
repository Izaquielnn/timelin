import { Action } from '@ngrx/store'
import { Event } from '../../models/event.model';

export const GET_EVENTS      = '[EVENT] Get';
export const ADD_EVENT       = '[EVENT] Add';
export const REMOVE_EVENT    = '[EVENT] Remove';
export const UPDATE_EVENT    = '[EVENT] Update';


export class GetEvents implements Action {
    readonly type = GET_EVENTS;
    constructor(public payload: Event []) {}
}

export class AddEvent implements Action {
    readonly type = ADD_EVENT;

    constructor(public payload: Event) {}
}

export class RemoveEvent  implements Action {
    readonly type = REMOVE_EVENT;

    constructor(public payload: Event) {}
}

export class UpdateEvent  implements Action {
    readonly type = UPDATE_EVENT;

    constructor(public payload: Event) {}
}



export type Actions = GetEvents | AddEvent  | RemoveEvent | UpdateEvent; 