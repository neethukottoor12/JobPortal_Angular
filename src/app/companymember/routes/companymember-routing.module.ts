import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanymemberHomeComponent } from '../components/companymember-home/companymember-home.component';
import { CompanymemberAddComponent } from '../components/companymember-add/companymember-add.component';
import { CompanymemberListComponent } from '../components/companymember-list/companymember-list.component';

const routes: Routes = [
  {path:'',component:CompanymemberHomeComponent,
    children:[
      {path:'add',component:CompanymemberAddComponent},
      {path:'list',component:CompanymemberListComponent},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanymemberRoutingModule { }
