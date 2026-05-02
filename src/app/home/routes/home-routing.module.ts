import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CommonModule } from '@angular/common';
import { loginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivateChild:[loginGuard],
    children:[
      {
        path:'dashboard',
        loadChildren:()=>import('../../dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path:'company',
        loadChildren:()=>import('../../company/company.module').then(m=>m.CompanyModule)
      },
      {
        path:'jobs',
        loadChildren:()=>import('../../job/job.module').then(m=>m.JobModule)
      },
      {
        path:'applications',
        loadChildren:()=>import('../../application/application.module').then(m=>m.ApplicationModule)
      },
      {
        path:'interviews',
        loadChildren:()=>import('../../interview/interview.module').then(m=>m.InterviewModule)
      },
      {
        path:'companymember',
        loadChildren:()=>import('../../companymember/companymember.module').then(m=>m.CompanymemberModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
