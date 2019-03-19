import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from '../models/tag.model';
import  config  from '../config';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  getTags(): Observable<any>{
    const url = `${config.BASE_URL}/tags`;
    return this.http.get(url);
  }

  addTag(name: string, color: string): Observable<any> {
    const url = `${config.BASE_URL}/tags`;
    return this.http.post<Tag>(url, {name, color});
  }

  removeTag(id: number): Observable<any>{
    const url = `${config.BASE_URL}/tags/${id}`;
    return this.http.delete(url);
  }

  updateTag(tag: Tag): Observable<any>{
    const url = `${config.BASE_URL}/tags/${tag.id}`;
    return this.http.put(url, tag);
  }

  deleteTag(tag: Tag): Observable<any>{
    const url = `${config.BASE_URL}/tags/${tag.id}`;
    return this.http.delete(url);
  }
}
