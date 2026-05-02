import { CanActivateFn,Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const loggedIn=localStorage.getItem('loggedIn')=='true';
  if(!loggedIn)
  {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
export const loginChildGuard: CanActivateFn = (route, state) => {
  return loginGuard(route, state);
};