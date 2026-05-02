import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntervieweeDto } from 'src/app/interview/models/interviewee-dto';
import { environment } from 'src/environments/environment';
import { ApplicationDto } from 'src/app/application/models/application-dto';
import { JobpostDto } from 'src/app/job/models/jobpost-dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  interviewlisturl=environment.interbaseurl;
  
  alljobposturl=environment.baseurl+'company/';
  applicationurl=environment.baseurl+'job-provider/';
  constructor(private http:HttpClient) { }
  FetchInterviewlist(companyId:string)
    {
      return this.http.get<IntervieweeDto[]>(`${this.interviewlisturl}${companyId}/FetchInterviewlist`);
    }
  getJobApplicants(jobproviderId:string)
    {
      return this.http.get<ApplicationDto[]>(`${this.applicationurl}${jobproviderId}/GetJobApplicants`);
    }
  getAllJobs(companyId:string)
  {
    return this.http.get<JobpostDto[]>(`${this.alljobposturl}${companyId}/GetAllJobs`);
  }

}
