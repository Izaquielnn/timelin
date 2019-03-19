import { Action } from '@ngrx/store'
import { Tag } from '../../models/tag.model';

export const GET_TAGS      = '[TAG] Get';
export const ADD_TAG       = '[TAG] Add';
export const REMOVE_TAG    = '[TAG] Remove';
export const UPDATE_TAG    = '[TAG] Update';


export class GetTags implements Action {
    readonly type = GET_TAGS;
    constructor(public payload: Tag []) {}
}

export class AddTag implements Action {
    readonly type = ADD_TAG;

    constructor(public payload: Tag) {}
}

export class RemoveTag  implements Action {
    readonly type = REMOVE_TAG;

    constructor(public payload: Tag) {}
}

export class UpdateTag  implements Action {
    readonly type = UPDATE_TAG;

    constructor(public payload: Tag) {}
}



export type Actions = GetTags | AddTag  | RemoveTag | UpdateTag; 