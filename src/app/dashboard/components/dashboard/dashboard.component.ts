import { Component, OnInit } from '@angular/core';
import { ApplicationDto } from 'src/app/application/models/application-dto';
import { IntervieweeDto } from 'src/app/interview/models/interviewee-dto';
import { JobpostDto } from 'src/app/job/models/jobpost-dto';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  intervieweeList:IntervieweeDto[]=[];
  applicantList:ApplicationDto[]=[];
  jobpostList:JobpostDto[]=[];
  companyId!:string;
  jobProviderId!:string;
  constructor(private service:DashboardService){}
  ngOnInit(): void {
    this.companyId=localStorage.getItem('companyId')??'';
    this.jobProviderId=localStorage.getItem('ProviderId')??'';
    this.fetchIntervieweeDetails();
    this.fetchApplicantDetails();
    this.fetchJobPostDetails();
  }
  fetchIntervieweeDetails()
  {
    this.service.FetchInterviewlist(this.companyId).subscribe((res)=>{
      this.intervieweeList=res;
    })
  }
  fetchApplicantDetails()
  {
    this.service.getJobApplicants(this.jobProviderId).subscribe((res)=>
    {
      this.applicantList=res;
    })
  }
  fetchJobPostDetails()
  {
    this.service.getAllJobs(this.companyId).subscribe((res)=>
    {
      this.jobpostList=res;
    })
  }



  

}
