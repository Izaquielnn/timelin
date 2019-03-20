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
  event: Event = new Event();
  
  constructor(private eventService: EventService,
              private store: Store<AppState>) {
    this.events = store.select('event');
  }

  ngOnInit() {
  }

  openEventForm(){
    const  modal = document.getElementById('modalEventForm');
    modal.style.display = "block";
  }
  closeEventModal(){
    this.event = new Event();
    const  modal = document.getElementById('modalEventForm');
    modal.style.display = "none";
  }

  createEvent(){
    this.eventService.addEvent(this.event.name, this.event.description, this.event.date, this.event.tags, this.event.color)
    .subscribe(
      newEvent => {
        this.store.dispatch(new EventActions.AddEvent(newEvent));
        this.closeEventModal();
      },
      error => console.log(error.error)
    )
  }

  delEvent(eventToDel){
    let confirmation = confirm("Deseja realmente deletar o acontecimento?");
    if(confirmation){
      this.eventService.deleteEvent(eventToDel)
      .toPromise().then(() => 
        this.store.dispatch(new EventActions.RemoveEvent(eventToDel))
      ).catch(error =>  console.log(error));
    }
  }

  openModalupdateEvent(eventToUpdate){
    this.event = eventToUpdate;
    this.openEventForm();
  }

  updateEvent(){
    this.eventService.updateEvent(this.event)
    .subscribe(
      eventUpdated => {
        this.store.dispatch(new EventActions.UpdateEvent(eventUpdated))
        this.closeEventModal()
      },
      error => console.log(error)
    )
  }
}
