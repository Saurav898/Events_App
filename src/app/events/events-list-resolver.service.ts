import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { EventService } from "./shared/event.service";
import { map } from "rxjs/operators";

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) {
  }

  resolve(){
    return this.eventService.getEvents()    //maps give access to events passed from the stream
                                            //if anywhere outside resolve then we would need to use
                                            //return this.eventService.getEvents().subscribe() to
                                            //subscribe to that hhtp request
  }
}
