import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from '../components/job-list/job-list.component';
import { JobHomeComponent } from '../components/job-home/job-home.component';
import { JobAddComponent } from '../components/job-add/job-add.component';
import { JobUpdateComponent } from '../components/job-update/job-update.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path:'',component:JobHomeComponent,
    children:[
      {path:'list',component:JobListComponent},
      {path:'add',component:JobAddComponent},
      {path:'update/:id',component:JobUpdateComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JobRoutingModule { }
