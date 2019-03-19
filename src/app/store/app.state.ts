import { Event } from '../models/event.model';
import { Tag } from '../models/tag.model';


export interface AppState {
    readonly event: Event[];
    readonly tag: Tag[];
}