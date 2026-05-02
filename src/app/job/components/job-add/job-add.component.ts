import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Location } from '../../models/location';
import { CompanyDTO } from '../../models/company-dto';
import { JobCategory } from '../../models/job-category';
import { Industry } from 'src/app/company/models/industry';
import { Jobpost } from '../../models/jobpost';
import { Skill } from '../../models/skill';
import { Qualification } from '../../models/qualification';


@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {

  addJobForm!:FormGroup;
  locationList:Location[]=[];
  companyList:CompanyDTO[]=[];
  providerid!:string;
  categoryList:JobCategory[]=[];
  industryList:Industry[]=[];
  skillList:Skill[]=[];
  qualificationList:Qualification[]=[];
  successMessage!:string;
  errorMessage!:string;
  isSubmiting=false;
  constructor(private fb:FormBuilder,private service:JobService){}
  ngOnInit(): void {
     // Form initialization
    this.addJobForm = this.fb.group({
      
      jobTitle: ['', Validators.required],
      jobSummary: ['', Validators.required],
      locationId: ['', Validators.required],
      companyId: ['', Validators.required],
      categoryId: ['', [Validators.required]],
      industryId: ['', [Validators.required,]],
      responsibilities:this.fb.array([this.createResponsibilities()]),
      skillIds:this.fb.array([this.createSkills()]),
      qualificationIds:this.fb.array([this.createQualifications()])
      
    });
    this.providerid=localStorage.getItem('ProviderId')??'';
    this.getLocations();
    this.getCompanydetails();
    this.getCategoryDetails();
    this.getIndustryDetails();
    this.getSkillDetails();
    this.getQualificationDetails();
  }
  getLocations()
  {
    this.service.getLocations().subscribe((res)=>
    {
      this.locationList=res;
    })
  }
  getCompanydetails()
  {
    this.service.getCompany(this.providerid).subscribe((res)=>
    {
      this.companyList=res;
    })
  }
  getCategoryDetails()
  {
    this.service.getCategory().subscribe((res)=>
    {
      this.categoryList=res;
    })

  }
  getIndustryDetails()
  {
    this.service.getIndustries().subscribe((res)=>
    {
      this.industryList=res;
    })
  }
  getSkillDetails()
  {
    this.service.getSkills().subscribe((res)=>
    {
      this.skillList=res;
    })
  }
  getQualificationDetails()
  {
    this.service.getQualifications().subscribe((res)=>
    {
      this.qualificationList=res;
    })
  }

  //Responsibilities Array
  get responsibilities():FormArray{
    return this.addJobForm.get('responsibilities') as FormArray;

  }
  createResponsibilities():FormGroup
  {
    return this.fb.group({
      resName:['',Validators.required]
    })
  }
   addResponsibility() {

    return this.responsibilities.push(this.createResponsibilities());
   }
   removeResponsibilities(index:number){
    this.responsibilities.removeAt(index);
   }

   //skills Array

   createSkills():FormGroup
   {
    return this.fb.group({
      skillId:['',Validators.required]
    })
   }
   get skillIds():FormArray
   {
    return this.addJobForm.get('skillIds') as FormArray;
   }
   removeSkillIds(index:number)
   {
    return this.skillIds.removeAt(index);
   }
   addSkills()
   {
    return this.skillIds.push(this.createSkills());
   }

   //Qualifications Array

   createQualifications():FormGroup
   {
    return this.fb.group({
      qualificationId:['',Validators.required]
    });
   }
   get qualificationIds():FormArray
   {
    return this.addJobForm.get('qualificationIds') as FormArray;
   }
   removeQualifications(index:number)
   {
    return this.qualificationIds.removeAt(index);

   }
   addQualifications()
   {
    return this.qualificationIds.push(this.createQualifications());
   }

   onSubmit()
   {
    if(this.addJobForm.invalid) return;
    if(this.isSubmiting) return;
    this.isSubmiting=true;
    const payload:Jobpost={
      ...this.addJobForm.value,
      postedBy:this.providerid,
      postedDate:new Date().toISOString(),
      responsibilities:this.responsibilities.value.map((x:any)=>x.resName),
      skillIds:this.skillIds.value.map((x:any)=>x.skillId),
      qualificationIds:this.qualificationIds.value.map((x:any)=>x.qualificationId)
    }
    this.service.postJob(payload,this.addJobForm.value.companyId,this.providerid).subscribe(
    {
      next:()=>{
        console.log("Job posted Successfully");
        this.successMessage="Job posted Successfully";
        setTimeout(()=>{
          this.successMessage="";
        },3000)
        this.resetForm();
        this.isSubmiting=false;
      },
      error:()=>
      {
        this.errorMessage="Something went Wrong..Please try again";
        this.resetForm();
        setTimeout(()=>{
          this.successMessage="";
        },3000)
        this.isSubmiting=false;
      }
      
    })


   }
   resetForm()
   {
    this.addJobForm.reset();
   }
  
   

}
