import { Component } from '@angular/core';

@Component({
  selector: 'app-companymember-header',
  templateUrl: './companymember-header.component.html',
  styleUrls: ['./companymember-header.component.css']
})
export class CompanymemberHeaderComponent {
  isMenuOpen:boolean=false;
  toggleMenu()
  {
    this.isMenuOpen=!this.isMenuOpen;
  }

}
