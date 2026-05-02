import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { CompanyDTO } from '../models/company-dto';
import { JobCategory } from '../models/job-category';
import { Industry } from 'src/app/company/models/industry';
import { Jobpost } from '../models/jobpost';
import { Skill } from '../models/skill';
import { Qualification } from '../models/qualification';
import { JobpostDto } from '../models/jobpost-dto';
import { UpdateJobPostdto } from '../models/update-job-postdto';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient){}

locationUrl=environment.baseurl+'admin/Getlocations';
companyurl=environment.baseurl+'job-provider';
categoryurl=environment.baseurl+'admin/GetCategories';
industryurl=environment.baseurl+'admin/GetIndustries';
jobposturl=environment.baseurl+'company/';
skillsurl=environment.baseurl+'admin/GetSkills';
qualificationurl=environment.baseurl+'admin/GetQualifications';
jobpostbyproviderurl=environment.baseurl+'company/';
jobpostbyidurl=environment.baseurl+'job-provider/';
updatejoburl=environment.baseurl+'company/';
deletejoburl=environment.baseurl+'company/';

getLocations()
{
  return this.http.get<Location[]>(this.locationUrl);
}
getCompany(providerid:string)
{
  return this.http.get<CompanyDTO[]>(`${this.companyurl}/${providerid}/getCompany`);
}
getCategory()
{
  return this.http.get<JobCategory[]>(this.categoryurl);
}
 getIndustries()
  {
    return this.http.get<Industry[]>(this.industryurl);
  }
  postJob(job:Jobpost,companyid:string,providerid:string)
  {
    return this.http.post(`${this.jobposturl}${companyid}/job-provider/${providerid}/Postjob`,job);
  }
  getSkills()
  {
    return this.http.get<Skill[]>(this.skillsurl);
  }
  getQualifications()
  {
    return this.http.get<Qualification[]>(this.qualificationurl);
  }
  getJobsByProvider(companyid:string,providerid:string)

  {
    return this.http.get<JobpostDto[]>(`${this.jobpostbyproviderurl}${companyid}/job-provider/${providerid}/GetAllJobsByProvider`);
  }
  getJobsById(id:string)
  {
    return this.http.get<UpdateJobPostdto>(`${this.jobpostbyidurl}${id}/getJobpostById`);
  }
  updateJob(id:string,companyId:string,jobproviderId:string,job:any)
  {
    return this.http.put(`${this.updatejoburl}${companyId}/job-provider/${jobproviderId}/job/${id}/UpdateJob`,job);
  }
  deleteJobPost(jobid:string,companyId:string,joproviderId:string)
  {
    return this.http.delete(`${this.deletejoburl}${companyId}/job-provider/${joproviderId}/job/${jobid}/DeleteJob`,{ responseType: 'text' });
  }
  
}
