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
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  tags: Observable<Tag[]>;
  events: Observable<Event[]>;
  
  constructor(private tagService: TagService,
              private eventService: EventService,
              private store: Store<AppState>,
              private router: Router) {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    
  }

  ngOnInit() {
    this.tagService.getTags()
    .subscribe(
      tags => {
        this.store.dispatch(new TagActions.GetTags(tags))
        this.tags = this.store.select('tag');
        console.log(tags);
      },
      error => console.log(error.error)
    );

    this.eventService.getEvents()
    .subscribe(
      events => {
        this.store.dispatch(new EventActions.GetEvents(events))
        this.events = this.store.select('event');
        console.log(events);
      },
      error => console.log(error.error)
    )

  }

}
