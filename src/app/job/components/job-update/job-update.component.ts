import { Component } from '@angular/core';
import { FormGroup ,FormArray} from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { JobpostDto } from '../../models/jobpost-dto';
import { UpdateJobPostdto } from '../../models/update-job-postdto';
import { CompanyDTO } from '../../models/company-dto';
import { Location } from '../../models/location';
import { JobCategory } from '../../models/job-category';
import { Industry } from 'src/app/company/models/industry';
import { Skill } from '../../models/skill';
import { Qualification } from '../../models/qualification';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent {

  updateJobForm!:FormGroup;
  jobPostId!:string;
  jobtoUpdate!:UpdateJobPostdto;
  successMessage!:string;
  errorMessage!:string;
  locationList:Location[]=[];
  companyList:CompanyDTO[]=[];
  categoryList:JobCategory[]=[];
    industryList:Industry[]=[];
    skillList:Skill[]=[];
    qualificationList:Qualification[]=[];
    providerid!:string;
  constructor(private fb:FormBuilder,private service:JobService,private route:ActivatedRoute){}
    ngOnInit(): void {
       // Form initialization
      this.updateJobForm = this.fb.group({
        
        jobTitle: ['', Validators.required],
        jobSummary: ['', Validators.required],
        locationId: ['', Validators.required],
        companyId: ['', Validators.required],
        categoryId: ['', [Validators.required]],
        industryId: ['', [Validators.required,]],
        responsibilities:this.fb.array([]),
        skillIds:this.fb.array([]),
        qualificationIds:this.fb.array([])
        
      });
      this.jobPostId=this.route.snapshot.paramMap.get('id')??'';
      this.providerid=localStorage.getItem('ProviderId')??'';
      this.getJobsById();
      this.getLocations();
    this.getCompanydetails();
    this.getCategoryDetails();
    this.getIndustryDetails();
    this.getSkillDetails();
    this.getQualificationDetails();

}
getJobsById()
{
  this.service.getJobsById(this.jobPostId).subscribe((job:UpdateJobPostdto)=>
  {
    this.jobtoUpdate=job;
    this.updateJobForm.patchValue({
      jobTitle:job.jobTitle,
      jobSummary:job.jobSummary,
      locationId:job.locationId,
      companyId:job.companyId,
      categoryId:job.categoryId,
      industryId:job.industryId,


    });
    
    this.responsibilities.clear();
    job.responsibilities.forEach(r => {
      this.responsibilities.push(
        this.fb.group({ resName: r.description })
      );
    });

    
    this.skillIds.clear();
    job.skills.forEach(s => {
      this.skillIds.push(
        this.fb.group({ skillId: s.id })
      );
    });

    
    this.qualificationIds.clear();
    job.qualifications.forEach(q => {
      this.qualificationIds.push(
        this.fb.group({ qualificationId: q.id })
      );
    });
  });
  
}

//Responsibilities Array
  get responsibilities():FormArray{
    return this.updateJobForm.get('responsibilities') as FormArray;

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
    return this.updateJobForm.get('skillIds') as FormArray;
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
    return this.updateJobForm.get('qualificationIds') as FormArray;
   }
   removeQualifications(index:number)
   {
    return this.qualificationIds.removeAt(index);

   }
   addQualifications()
   {
    return this.qualificationIds.push(this.createQualifications());
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
  onUpdate()
  {
    if(this.updateJobForm.invalid) return;
    const payload = {
    jobTitle: this.updateJobForm.value.jobTitle,
    jobSummary: this.updateJobForm.value.jobSummary,
    locationId: this.updateJobForm.value.locationId,
    companyId: this.updateJobForm.value.companyId,
    categoryId: this.updateJobForm.value.categoryId,
    industryId: this.updateJobForm.value.industryId,
    jobproviderId:this.providerid,
    postedDate:new Date().toISOString(),
    
    responsibilities: this.responsibilities.value.map((x: any) => x.resName),
    skillIds: this.skillIds.value.map((x: any) => x.skillId),
    qualificationIds: this.qualificationIds.value.map((x: any) => x.qualificationId)
  };
    this.service.updateJob(this.jobPostId,this.updateJobForm.value.companyId,this.providerid,payload).subscribe({
      next:()=>{
        this.successMessage = "Job updated successfully";

      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },
    error: (err) => {
      console.error(err);
      this.errorMessage="Something went wrong while updating the job";
    
      }
    });
    
  }
}
