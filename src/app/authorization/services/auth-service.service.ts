import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Signup } from '../models/signup';
import { LoginResponse } from '../models/login-response';
import { CompanyDTO } from 'src/app/job/models/company-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  signupUrl=environment.baseurl+'Job-Provider/Signup';
  loginUrl=environment.baseurl+'jobprovider/login';
  companyurl=environment.baseurl+'job-provider';
  
  constructor(private http:HttpClient) { }
  
  postsigNuP(data:Signup){
    return this.http.post(this.signupUrl,data)
  }
  login(data:any)
  {
    return this.http.post<LoginResponse>(this.loginUrl,data)
  }
  verifySignup(id:string){
    return this.http.get(`${environment.baseurl}job-provider/signup/${id}/verify-email`,{});
  }
  setPassword(id:string,password:string)
  {
    return this.http.post(`${environment.baseurl}job-provider/signup/${id}/set-password`,JSON.stringify(password),{headers:{'Content-Type': 'application/json'}});
  }
  getCompany(providerid:string)
    {
      return this.http.get<CompanyDTO[]>(`${this.companyurl}/${providerid}/getCompany`);
    }

}
