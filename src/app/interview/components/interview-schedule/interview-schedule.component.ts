import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../services/interview.service';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrls: ['./interview-schedule.component.css']
})
export class InterviewScheduleComponent implements OnInit {
  
  providerid!:string;
  companyid!:string;
  scheduleForm!:FormGroup;
  applicationId!:string;
  successMessage!:string;
  errorMessage!:string;
   constructor(private fb:FormBuilder,private route:ActivatedRoute,private service:InterviewService){}
  ngOnInit(): void {

    this.providerid=localStorage.getItem('ProviderId')??'';
    this.companyid=localStorage.getItem('companyId')??'';
    this.applicationId=this.route.snapshot.paramMap.get('id')??'';
    this.scheduleForm=this.fb.group({
      date:['',Validators.required]
    })
    
  }
  onSubmit()
  {
    const date=new Date(this.scheduleForm.value.date);
    const corrected = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const isoDate = corrected.toISOString();
    this.service.scheduleInterview(this.providerid,this.applicationId,isoDate).subscribe({
      next:()=>{
        console.log("Interview scheduled successfully");
        this.successMessage='Interview scheduled successfully';
        setTimeout(()=>{
          this.successMessage='';
        },3000);
        this.resetForm();

      },
      error:(err)=>{
        console.log(err);
        if(err.error&& typeof err.error==='string')
        {
          this.errorMessage=err.error;
        }
        else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        }
       else {
          this.errorMessage = "Something went wrong..Please try again";
        }
        setTimeout(()=>{
          this.errorMessage='';
        },3000);
        this.resetForm();
      }
    })
  }
  resetForm()
  {
    this.scheduleForm.reset();
  }
 





}
