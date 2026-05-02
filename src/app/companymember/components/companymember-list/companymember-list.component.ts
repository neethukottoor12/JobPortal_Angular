import { Component, OnInit } from '@angular/core';
import { CompanymemberDto } from '../../models/companymember-dto';
import { CompanymemberService } from '../../services/companymember.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-companymember-list',
  templateUrl: './companymember-list.component.html',
  styleUrls: ['./companymember-list.component.css']
})
export class CompanymemberListComponent implements OnInit {
  memberList:CompanymemberDto[]=[];
  companyId!:string;
  companymemberId!:string;
  successMessage!:string;
  constructor(private service:CompanymemberService){}
  ngOnInit(): void {
    this.companyId=localStorage.getItem('companyId')??'';
    this.fetchCompanyMemberDetails();

  }
  fetchCompanyMemberDetails()
  {
    this.service.fetchCompanymembers(this.companyId).subscribe((res)=>
    {
      this.memberList=res;
    })
  }
  openDeleteModal( memberid:string)
  {
    this.companymemberId=memberid;
  }
  onDelete()
  {
    this.service.removeMember(this.companymemberId).subscribe({
      next:()=>{
        const modalElement=document.getElementById('deleteModal');
        const modalInstance=bootstrap.Modal.getInstance(modalElement!);
        modalInstance?.hide();
        modalInstance?.dispose();

        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
       

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        this.fetchCompanyMemberDetails();
         console.log("companymember removed Successfully");
        this.successMessage="companymember removed Successfully";
        
        
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

}
