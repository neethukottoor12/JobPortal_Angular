import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationDto } from '../models/application-dto';
import { UpdateapplicationDto } from '../models/updateapplication-dto';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  applicationurl=environment.baseurl+'job-provider/';
  applicantdetailsurl=environment.baseurl+'job-provider/applicant/';
  constructor(private http:HttpClient) { }
  getJobApplicants(jobproviderId:string)
  {
    return this.http.get<ApplicationDto[]>(`${this.applicationurl}${jobproviderId}/GetJobApplicants`);
  }
  getJobApplicantDetails(id:string)
  {
    return this.http.get<UpdateapplicationDto>(`${this.applicantdetailsurl}${id}`)
  }

}
