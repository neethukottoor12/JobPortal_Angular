import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewScheduleComponent } from './components/interview-schedule/interview-schedule.component';
import { InterviewListComponent } from './components/interview-list/interview-list.component';
import { InterviewHomeComponent } from './components/interview-home/interview-home.component';
import { InterviewHeaderComponent } from './components/interview-header/interview-header.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InterviewScheduleComponent,
    InterviewListComponent,
    InterviewHomeComponent,
    InterviewHeaderComponent
  ],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    ReactiveFormsModule
  ]
})
export class InterviewModule { }
