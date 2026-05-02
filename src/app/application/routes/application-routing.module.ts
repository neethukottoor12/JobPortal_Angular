import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationViewComponent } from '../components/application-view/application-view.component';
import { ApplicationHomeComponent } from '../components/application-home/application-home.component';
import { ApplicationListComponent } from '../components/application-list/application-list.component';

const routes: Routes = [
  {path:'',component:ApplicationHomeComponent,
    children:[
      {path:'list',component:ApplicationListComponent},
      {path:'views/:id',component:ApplicationViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
