import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  private profileImageSource = new BehaviorSubject<string>('assets/images/sidebar-icons/user-default.jpg');
  profileImage$ = this.profileImageSource.asObservable();

  updateProfileImage(image: string) {
    this.profileImageSource.next(image);
  }

}
