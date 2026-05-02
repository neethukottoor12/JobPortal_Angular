import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../services/interview.service';
import { IntervieweeDto } from '../../models/interviewee-dto';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  constructor(private service:InterviewService){}
  intervieweeList:IntervieweeDto[]=[];
  candidateList:IntervieweeDto[]=[];
  companyId!:string;
  interviewId!:string;
  successMessage!:string;

  ngOnInit(): void {
    this.companyId=localStorage.getItem('companyId')??'';
    this.FetchInterviewlist();
  }
  FetchInterviewlist()
  {
    this.service.FetchInterviewlist(this.companyId).subscribe((res)=>
    {
      this.intervieweeList=res;
      this.candidateList=res;
    })
  }
  openDeleteModal(id:string)
  {
    this.interviewId=id;
  }
  cancelScheduledInterview()
  {
    this.service.cancelInterview(this.interviewId).subscribe({
      next:()=>{
        const modalElement=document.getElementById('deleteModal');
        const modalInstance=bootstrap.Modal.getInstance(modalElement!);
        modalInstance?.hide();
        modalInstance?.dispose();

        // Remove backdrop manually
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
       

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
       
        this.FetchInterviewlist();
        console.log("Interview cancelled Successfully");
        this.successMessage="Interview cancelled Successfully";
        
        
        setTimeout(()=>
        {
          this.successMessage='';
        },3000)
        
        
      },
      error:()=>
      {
        alert('Error Occured.Please try again');
        
      }
    })
      
    
  }
  filteredInterviewee(event:Event)
  {
    const searchterm=(event.target as HTMLInputElement).value;
    this.intervieweeList=this.candidateList.filter(i=>i.jobTitle.toLowerCase().includes(searchterm.toLowerCase())||i.jobseekerUsername.toLowerCase().includes(searchterm.toLowerCase())||i.date.toString().includes(searchterm.toString()))
  }

}
