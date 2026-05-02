import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Signup } from '../../models/signup';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup;
  loading!:boolean;
  successMessage!:string;
  errorMessage!:string;

  constructor(private fb:FormBuilder,private service:AuthServiceService)
  {

  }
  ngOnInit(): void {
     this.signupForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern(/^\+?[1-9]\d{7,14}$/)]]
     })
    
  }
  onSignup(){
    this.loading=true;
    const data: Signup = this.signupForm.value;

    this.service.postsigNuP(data).subscribe({
      next: (value)=>
        {
          console.log(value);
          this.loading=false;
          
          this.resetForm();
        },
      error:()=>
        {
          
          this.errorMessage="Signup failed. Try again.";
          this.loading=false;

          this.signupForm.reset();
          setTimeout(() => {
            this.errorMessage='';
          }, 3000);

        }
  });
    
    
  }
  resetForm()
  {
    this.signupForm.reset();
      
  }

  

    

  
 


}
