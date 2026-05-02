import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanymemberService } from '../../services/companymember.service';

@Component({
  selector: 'app-companymember-add',
  templateUrl: './companymember-add.component.html',
  styleUrls: ['./companymember-add.component.css']
})
export class CompanymemberAddComponent implements OnInit {

  RegistrationForm!:FormGroup;
  companyId!:string;
  successMessage!:string;
  errorMessage!:string;
  constructor(private fb:FormBuilder,private service:CompanymemberService){}
  ngOnInit(): void {
    this.RegistrationForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern(/^\+?[1-9]\d{7,14}$/)]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)]]
    });
    this.companyId=localStorage.getItem('companyId')??'';
  }

  onRegister()
  {
    if(this.RegistrationForm.invalid) return;
    const payload={
      firstName:this.RegistrationForm.value.firstName,
      lastName:this.RegistrationForm.value.lastName,
      userName:this.RegistrationForm.value.userName,
      email:this.RegistrationForm.value.email,
      phone:this.RegistrationForm.value.phone,
      password:this.RegistrationForm.value.password
    }
    this.service.registerCompanyMember(this.companyId,payload).subscribe(
    {
      next:()=>{
        console.log("Member registered Successfully");
        this.successMessage='Member registered Successfully';
        setTimeout(()=>{
          this.successMessage='';
        },3000)
        this.resetForm();
      },
      error:()=>{
        console.log("Something went wrong..Please try again");
        this.errorMessage='Something went wrong..Please try again';
        setTimeout(()=>{
          this.errorMessage='';
        },3000)
        this.resetForm();
      }
    })
  }
  resetForm()
  {
    this.RegistrationForm.reset();
  }

}
