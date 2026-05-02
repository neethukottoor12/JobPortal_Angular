import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewHomeComponent } from './components/interview-home/interview-home.component';
import { InterviewScheduleComponent } from './components/interview-schedule/interview-schedule.component';
import { InterviewListComponent } from './components/interview-list/interview-list.component';

const routes: Routes = [
  {path:'',component:InterviewHomeComponent,
    children:[
      {path:'schedule/:id',component:InterviewScheduleComponent},
      {path:'list',component:InterviewListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
