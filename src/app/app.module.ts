import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
   EventsListComponent,
   EventThumbnailComponent,
   EventService,
   EventDetailsComponent,
   CreateEventComponent,
   EventListResolver,
   CreateSessionComponent,
   SessionListComponent,
   DurationComponent,
   UpVoteComponent,
   VoterService,
   LocationValidator,
   EventResolver,
 } from "./events/index";
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { TOASTR_TOKEN,
          JQ_TOKEN,
          Toastr,
          CollaspsibleWellComponent,
          SimpleModalComponent,
          ModalTriggerDirective
  } from "./common/index";
import { appRoutes } from "./routes"
import { Error404Component } from "./events/errors/404.component"
import { AuthService } from "./user/auth.service"

const toastr:Toastr = window['toastr']
const jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollaspsibleWellComponent,
    DurationComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery},
    EventResolver,
    EventListResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty)
      return window.confirm("You have not saved this event, do you really want to cancel?")
  return true
}
