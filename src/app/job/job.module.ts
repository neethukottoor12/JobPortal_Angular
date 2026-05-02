import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './routes/job-routing.module';
import { JobHeaderComponent } from './components/job-header/job-header.component';
import { JobHomeComponent } from './components/job-home/job-home.component';
import { JobAddComponent } from './components/job-add/job-add.component';
import { JobListComponent } from './components/job-list/job-list.component';

import { JobUpdateComponent } from './components/job-update/job-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    JobHeaderComponent,
    JobHomeComponent,
    JobAddComponent,
    JobListComponent,
    
    JobUpdateComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],

})
export class JobModule { }
