import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Industry } from '../models/industry';
import { Location } from 'src/app/job/models/location';
import { Company } from '../models/company';
import { CompanyDTO } from 'src/app/job/models/company-dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }
  locationUrl=environment.baseurl+'admin/Getlocations';
  industryurl=environment.baseurl+'admin/GetIndustries';
  registerurl=environment.combaseurl+''
  companyurl=environment.baseurl+'job-provider';
  companydetailsurl=environment.combaseurl+'company/';
  updatecompanyurl=environment.combaseurl+'company/';

  getIndustries()
  {
    return this.http.get<Industry[]>(this.industryurl);
  }
  getLocations()
  {
    return this.http.get<Location[]>(this.locationUrl);
  }
  registerCompany(providerId:string,comp:Company)
  {
    return this.http.post(`${this.registerurl}${providerId}/Registercompany`,comp);
  }
  getCompany(providerid:string)
  {
    return this.http.get<CompanyDTO[]>(`${this.companyurl}/${providerid}/getCompany`);
  }
  FetchCompanydetails(companyId:string)
  {
    return this.http.get<CompanyDTO>(`${this.companydetailsurl}${companyId}/FetchCompanyDetails`);
  }
 updateCompany(companyId: string, data: any) {
  return this.http.put(
    `${this.updatecompanyurl}${companyId}/UpdateCompany`,
    data,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
}
