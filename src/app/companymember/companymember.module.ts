import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanymemberRoutingModule } from './routes/companymember-routing.module';
import { CompanymemberAddComponent } from './components/companymember-add/companymember-add.component';
import { CompanymemberListComponent } from './components/companymember-list/companymember-list.component';
import { CompanymemberHomeComponent } from './components/companymember-home/companymember-home.component';
import { CompanymemberHeaderComponent } from './components/companymember-header/companymember-header.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanymemberAddComponent,
    CompanymemberListComponent,
    CompanymemberHomeComponent,
    CompanymemberHeaderComponent
  ],
  imports: [
    CommonModule,
    CompanymemberRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompanymemberModule { }
