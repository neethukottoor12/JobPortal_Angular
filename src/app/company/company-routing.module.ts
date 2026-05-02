import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { CompanyUpdateComponent } from './components/company-update/company-update.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {path:'',component:CompanyHomeComponent,
    children:[
      {path:'list',component:CompanyListComponent},
      {path:'add',component:CompanyAddComponent},
      {path:'update/:id',component:CompanyUpdateComponent}
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
export class CompanyRoutingModule { }
