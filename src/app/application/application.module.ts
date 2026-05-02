import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './routes/application-routing.module';

import { ApplicationViewComponent } from './components/application-view/application-view.component';
import { ApplicationHomeComponent } from './components/application-home/application-home.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';


@NgModule({
  declarations: [
    
    ApplicationViewComponent,
    ApplicationHomeComponent,
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
