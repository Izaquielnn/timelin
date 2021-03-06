import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from '../models/event.model';
import { Tag } from '../models/tag.model';
import  config  from '../config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any>{
    const url = `${config.BASE_URL}/events`;
    return this.http.get(url);
  }

  addEvent(name: string, description: string, date:Date, tags: Tag[], color: string): Observable<any> {
    const url = `${config.BASE_URL}/events`;
    return this.http.post<Event>(url, {name, description, date, color, tags});
  }

  updateEvent(event: Event): Observable<any>{
    const url = `${config.BASE_URL}/events/${event.id}`;
    return this.http.put(url, event);
  }

  deleteEvent(event: Event){
    const url = `${config.BASE_URL}/events/${event.id}`;
    return this.http.delete(url, {responseType: 'text'});
  }
}
