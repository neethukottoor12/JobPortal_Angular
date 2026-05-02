import { Component, OnInit } from '@angular/core';
import { CompanyDTO } from 'src/app/job/models/company-dto';
import { CompanyService } from '../../services/company.service';
import { Location } from 'src/app/job/models/location';
import { Industry } from '../../models/industry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companyList:CompanyDTO[]=[];
  providerid!:string;
  currentCompany!:CompanyDTO;
  locationList:Location[]=[];
  industryList:Industry[]=[];
  constructor(private service:CompanyService,private route:Router ){}
  ngOnInit(): void {
    this.providerid=localStorage.getItem('ProviderId')??'';
    this.getcompanyByProviderId();
    this.getLocationDetails();
    this.getIndustryDetails();
    console.log(this.companyList)
    console.log(this.industryList)
  }
  getcompanyByProviderId()
  {
    this.service.getCompany(this.providerid).subscribe((res)=>{
      this.companyList=res;
      
        this.currentCompany=this.companyList[0];
      
    }
    )
  }
  getLocationDetails()
  {
    this.service.getLocations().subscribe((res)=>
    {
      this.locationList=res;
    })
  }
  getIndustryDetails()
  {
    this.service.getIndustries().subscribe((res)=>{
      this.industryList=res;
    })
  }
  getIndustryName(id:string)
  {
    var industry1=this.industryList.find(i=>i.id.toString()==id.toString());
    return industry1?.name;
  }
  getLocationName(id:string)
  {
    var location1=this.locationList.find(l=>l.id.toString()==id.toString());
    return location1?.name;
  }
  onUpdate(id:string)
  {

    this.route.navigate(['/home/company/update',id]);
  }

}
