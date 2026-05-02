import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isResponsive: boolean = false;

  toggleResponsive() {
    this.isResponsive = !this.isResponsive;
  }
  
  profileImage: string = '';
  constructor(private profileService: ProfileService,private route:Router) {}
  ngOnInit() {
  this.profileService.profileImage$.subscribe(img => {
    this.profileImage = img;
  });

 
}
 logout()
  {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  goHome()
  {
    this.route.navigate(['/dashboard'])
  }

  }
