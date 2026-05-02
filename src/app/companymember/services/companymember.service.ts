import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanymemberDto } from '../models/companymember-dto';

@Injectable({
  providedIn: 'root'
})
export class CompanymemberService {

  constructor(private http:HttpClient) { }
  registrationurl=environment.combaseurl+'company/';
  companymemberurl=environment.combaseurl+'company/';
  removememberurl=environment.combaseurl+'company/';
  registerCompanyMember(companyId:string,data:any)
  {
    return this.http.post(`${this.registrationurl}${companyId}/Addcompanymember`,data);
  }
  fetchCompanymembers(companyId:string)
  {
    return this.http.get<CompanymemberDto[]>(`${this.companymemberurl}${companyId}/listcompanymember`);
  }
  removeMember(memberid:string)
  {
    return this.http.delete(`${this.removememberurl}${memberid}/RemoveCompanyMember`,{responseType:'text'});
  }
}
