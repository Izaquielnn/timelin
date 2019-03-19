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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  tags: Observable<Tag[]>;
  constructor(private tagService: TagService,
              private eventService: EventService,
              private store: Store<AppState>) {
    this.tags = store.select('tag');
  }

  ngOnInit() {
    this.tagService.getTags()
    .subscribe(
      tags => {
        this.store.dispatch(new TagActions.GetTags(tags))
        this.tags = this.store.select('tag');
        console.log(tags);
        console.log(this.tags);
      },
      error => console.log(error.error)
    )
  }

}
