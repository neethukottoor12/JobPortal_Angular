import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CompanyDTO } from 'src/app/job/models/company-dto';
import { combineAll } from 'rxjs';
import { Industry } from '../../models/industry';
import { Location } from 'src/app/job/models/location';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit{
  companyUpdateForm!:FormGroup;
  companyToUpdate!:CompanyDTO;
  CompanyId!:string;
  successMessage!:string;
  industryList:Industry[]=[];
  locationList:Location[]=[];
    constructor(private fb:FormBuilder,private service:CompanyService,private route:ActivatedRoute){}
    ngOnInit(): void {
      this.companyUpdateForm=this.fb.group({
        legalName:['',Validators.required],
        summary:['',Validators.required],
        industry:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern(/^\+?[1-9]\d{7,14}$/)]],
        address:['',Validators.required],
        website:['',Validators.required],
        location:['',Validators.required]
      })
      this.CompanyId=this.route.snapshot.paramMap.get('id')??'';
      
      this.getIndustryDetails();
      this.getLocationDetails();
      console.log(this.industryList)
      setTimeout(() => {
    this.fetchcompanyDetails();
  }, 300);
    }

    fetchcompanyDetails()
    {
      this.service.FetchCompanydetails(this.CompanyId).subscribe((company:CompanyDTO)=>{
        this.companyToUpdate=company;
        this.companyUpdateForm.patchValue({
          legalName:company.legalName,
          summary:company.summary,
          industry:company.industry,
          email:company.email,
          phone:company.phone,
          address:company.address,
          website:company.website,
          location:company.location
        })
      });
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
  
    onSubmit()
    {
      if(this.companyUpdateForm.invalid) return;
      const payload={
        id:this.CompanyId,
        legalName:this.companyUpdateForm.value.legalName,
        summary:this.companyUpdateForm.value.summary,
        industry:this.companyUpdateForm.value.industry,
        email:this.companyUpdateForm.value.email,
        phone:this.companyUpdateForm.value.phone,
        address:this.companyUpdateForm.value.address,
        website:this.companyUpdateForm.value.website,
        location:this.companyUpdateForm.value.location
      }
      this.service.updateCompany(this.CompanyId,payload).subscribe({
        next:()=>{
          console.log("Updated Successfully");
          this.successMessage='Updated Successfully';
          

        },
        error:()=>
        {
          alert("Something went wrong..Please try again")
          
        }
      })

    }
   

}
