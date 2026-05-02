import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IntervieweeDto } from '../models/interviewee-dto';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http:HttpClient) { }
  scheduleurl=environment.interbaseurl;
  interviewlisturl=environment.interbaseurl;
  cancelinterviewurl=environment.interbaseurl;
  scheduleInterview(companyuserid:string,applicationId:string,date:string)
  {
    const data={
      applicationId:applicationId,
      date:date
    }
    return this.http.post(`${this.scheduleurl}${companyuserid}/ScheduleInterview`,data);
  }
  FetchInterviewlist(companyId:string)
  {
    return this.http.get<IntervieweeDto[]>(`${this.interviewlisturl}${companyId}/FetchInterviewlist`);
  }
  cancelInterview(interviewId:string)
  {
    return this.http.delete(`${this.cancelinterviewurl}${interviewId}/cancelInterview`,{responseType:'text'});
  }
}
