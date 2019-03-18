import { Tag } from './tag.model';

export class Event {
    id?: string;
    name?: string;
    description?: string;
    color?: string;
    date?: string;
    tags?: Tag[];
}