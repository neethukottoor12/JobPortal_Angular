import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateapplicationDto } from '../../models/updateapplication-dto';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  constructor(private route:ActivatedRoute,private service:ApplicationService){}
  applicantid!:string;
  applicanttoView!:UpdateapplicationDto;

  ngOnInit(): void {
    this.applicantid=this.route.snapshot.paramMap.get('id')??'';
    this.FetchApplicantDetails();
  }
  FetchApplicantDetails()
  {

    this.service.getJobApplicantDetails(this.applicantid).subscribe((res)=>
    {
      this.applicanttoView=res;
    });
  }
 viewResume() {
  const byteCharacters = atob(this.applicanttoView.resumeBase64!);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
  




}
