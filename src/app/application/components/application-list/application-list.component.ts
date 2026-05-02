import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDto } from '../../models/application-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applicantList:ApplicationDto[]=[];
  candidateList:ApplicationDto[]=[];
  jobproviderid!:string;
  constructor(private service:ApplicationService,private router:Router){}
  ngOnInit(): void {

    this.jobproviderid=localStorage.getItem('ProviderId')??'';
    this.getApplicantDetails();

    
  }
  getApplicantDetails()
  {
    this.service.getJobApplicants(this.jobproviderid).subscribe((res)=>
    {
      this.applicantList=res;
      this.candidateList=res;
    })
  }
  onDisplay(id:string)
  {
    this.router.navigate(['/home/applications/views',id])
  }
  onSchedule(id:string)
  {
    this.router.navigate(['/home/interviews/schedule',id])
  }
  filteredApplication(event:Event)
  {
    const searchterm=(event.target as HTMLInputElement).value;
    this.applicantList=this.candidateList.filter(a=>a.jobTitle.toLowerCase().includes(searchterm.toLowerCase())||a.qualifications.some(q=>q.toLowerCase().includes(searchterm.toLowerCase()))||a.totalYearsOfExperience.toString().includes(searchterm.toString()));
  }


}
