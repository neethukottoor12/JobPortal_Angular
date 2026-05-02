import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  profileImage:string='assets/images/sidebar-icons/user-default.jpg';
  constructor(private profileService: ProfileService) {}


  uploadPhoto(event:any)
  {
    const file=event.target.files[0];
    if(!file) return;
    const reader= new FileReader();
    reader.onload=()=>{

      const img=reader.result as string;
      this.profileImage=img;
      this.profileService.updateProfileImage(img);

    };
    reader.readAsDataURL(file);

  }

}
