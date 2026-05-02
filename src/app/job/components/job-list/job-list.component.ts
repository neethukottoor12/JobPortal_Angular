import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location';
import { JobCategory } from '../../models/job-category';
import { JobService } from '../../services/job.service';
import { Company } from 'src/app/company/models/company';
import { CompanyDTO } from '../../models/company-dto';
import { JobpostDto } from '../../models/jobpost-dto';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  locationList:Location[]=[];
  categoryList:JobCategory[]=[];
  providerid!:string;
  companyList:CompanyDTO[]=[];
  companyid!:string;
  companyName!:string;
  jobpostList:JobpostDto[]=[];
  jobvacancyList:JobpostDto[]=[];
  jobToDelete!:string;
  activePage: number = 0;
  title = "pagnation";
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [5, 10, 15, 20];
  successMessage!:string;
  constructor(private service:JobService,private route:Router){}
  ngOnInit(): void {
     this.providerid=localStorage.getItem('ProviderId')??'';
    this.getCompanydetails();
    
  }
  
   getCompanydetails()
  {
    this.service.getCompany(this.providerid).subscribe((res)=>
    {
      this.companyList=res;
      
      if (this.companyList.length > 0) {
      this.companyid = this.companyList[0].id;
      this.companyName = this.companyList[0].legalName;

      
      this.getAllJobsByProvider();
      }
    });
  }
  getAllJobsByProvider()
  {
    this.service.getJobsByProvider(this.companyid,this.providerid).subscribe((res)=>
    {
     this.jobpostList=res;
     this.jobvacancyList=res;
     this.POSTS=res;
    })
  }

 
onTableDataChange(event: any) {
    this.page = event;
    this.getAllJobsByProvider();
  }
  tableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllJobsByProvider();
  }
  Updatejoblist(id:string)
  {
    this.route.navigate(['/home/jobs/update',id])
  }
  openDeleteModal(id:string)
  {
    this.jobToDelete=id;

  }
  deleteJobPost()
  {

    this.service.deleteJobPost(this.jobToDelete,this.companyid,this.providerid).subscribe({
      next:()=>
      {
        const modalElement=document.getElementById('deleteModal');
        const modalInstance=bootstrap.Modal.getInstance(modalElement!);
        modalInstance?.hide();
        modalInstance?.dispose();

        // Remove backdrop manually
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
       

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }

        this.getAllJobsByProvider();
        console.log("JobPost Deleted Successfully");
        this.successMessage="JobPost Deleted Successfully";
        
        
        setTimeout(()=>
        {
          this.successMessage='';
        },3000)
        
        
      },
      error:()=>
      {
        alert('Error Occured.Please try again');
        
      }
    })
  }
  filteredJobs(event:Event)
  {
    const searchterm=(event.target as HTMLInputElement).value;
    this.jobpostList=this.jobvacancyList.filter(j=>j.jobTitle.toLowerCase().includes(searchterm.toLowerCase()));
  }

}
