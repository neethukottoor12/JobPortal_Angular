import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';


const routes: Routes = [
  {path:'' ,
    loadChildren:()=>import('./authorization/authorization.module').then(m=>m.AuthorizationModule)
  },
  {
    path:'home',canActivate:[loginGuard],
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
