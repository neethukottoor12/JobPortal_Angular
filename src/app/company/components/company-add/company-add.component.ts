import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Industry } from '../../models/industry';
import { CompanyService } from '../../services/company.service';
import { Location } from 'src/app/job/models/location';
import { Company } from '../../models/company';
@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  companyAddForm!:FormGroup;
  industryList:Industry[]=[];
  locationList:Location[]=[];
  comp!:Company;
  providerid:string="";
  successMessage!:string;
  errorMessage!:string;
  companyID!:string;
  constructor(private fb:FormBuilder,private service:CompanyService){}
  ngOnInit(): void {
    this.companyAddForm=this.fb.group({
      legalName:['',Validators.required],
      summary:['',Validators.required],
      industryId:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern(/^\+?[1-9]\d{7,14}$/)]],
      address:['',Validators.required],
      website:['',Validators.required],
      location:['',Validators.required]
    })
    this.getIndustryDetails();
    this.getLocationDetails();
  }
  getIndustryDetails()
  {
    this.service.getIndustries().subscribe((value)=>
    {
      this.industryList=value;
    })

  }
   getLocationDetails()
  {
    this.service.getLocations().subscribe((res)=>
    {
      this.locationList=res;
    })

  }
  onSubmit()
  {
    
    console.log(this.companyAddForm.value);
    this.comp=this.companyAddForm.value;
    this.providerid=localStorage.getItem('ProviderId')??'';
    if (!this.providerid) {
      alert(" Please login again.");
      return;
    }

    this.service.registerCompany(this.providerid,this.comp).subscribe({
      next:(value)=>{
        console.log("Successfully Registered");
        this.successMessage="Registered Successfully";
        
        setTimeout(()=>
        {
          this.successMessage='';
        },3000)
        this.resetForm();
        
      },
      error:()=>
      {
        this.errorMessage='Something went wrong..Please try again..';
        this.resetForm();
      }
    }
      
    )
  }
  resetForm()
  {
    this.companyAddForm.reset();
  }

  


}
