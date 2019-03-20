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
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  tags: Observable<Tag[]>;
  events: Observable<Event[]>;
  user: User = new User();
  userToUpdate: User = new User();
  errorMessage: string | null;
  
  constructor(private tagService: TagService,
              private eventService: EventService,
              private store: Store<AppState>,
              private userService: UserService,
              private router: Router) {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    
  }

  ngOnInit() {
    this.userService.getUser()
    .subscribe(
      user => {
        this.user = user;
        this.userToUpdate = {...user};
      },
      error => console.log(error)
    )
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

  openUserForm(){
    const  modal = document.getElementById('modalUserForm');
    modal.style.display = "block";
  }
  closeUserModal(){
    this.userToUpdate = {...this.user};
    const  modal = document.getElementById('modalUserForm');
    modal.style.display = "none";
  }

  onSubmit(): void {
    this.userService.updateUser(this.userToUpdate)
    .subscribe(
      userUpdated => {
        this.user = userUpdated
        this.closeUserModal();
      },
      error => {
        console.log(error)
        this.errorMessage = error.error
      }
    )
  }
  
}
