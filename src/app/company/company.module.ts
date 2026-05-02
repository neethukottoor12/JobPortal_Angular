import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyHeaderComponent } from './components/company-header/company-header.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyUpdateComponent } from './components/company-update/company-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyHeaderComponent,
    CompanyHomeComponent,
    CompanyAddComponent,
    CompanyListComponent,
    CompanyUpdateComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
