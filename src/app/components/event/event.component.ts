import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as TagActions from '../../store/actions/tag.actions';
import * as EventActions from '../../store/actions/event.actions';
import { TagService } from '../../services/tag.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Tag } from '../../models/tag.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Observable<Event[]>;
  
  constructor(private eventService: EventService,
              private store: Store<AppState>) {
    this.events = store.select('event');
  }

  ngOnInit() {
  }

}
