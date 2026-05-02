import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  confirmForm!:FormGroup;
  signupId!:string;
  
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private service:AuthServiceService){}
  ngOnInit(): void {
    this.confirmForm=this.fb.group({
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)]],
      confirmpassword:['',Validators.required]
    },
  {
    validators:this.passwordMatchValidator
  });
  this.route.queryParams.subscribe(params=>{
    this.signupId=params['signupid'];
    if(this.signupId)
    {

      this.service.verifySignup(this.signupId).subscribe({
        next:()=>{
        console.log("Verified Successfully");
        
    },
    error:()=>{
      alert("Invalid or expired verification link");
          this.router.navigate(['/signup']);

    }
      });
     
      
    }
  });
  }

  passwordMatchValidator(formgroup:FormGroup)
  {
    const passwordcontrol=formgroup.get('password');
    const confirmpasswordcontrol=formgroup.get('confirmpassword');
    if(passwordcontrol&&confirmpasswordcontrol)
    {
      if(passwordcontrol.value!=confirmpasswordcontrol.value)
      {
        confirmpasswordcontrol.setErrors({passwordMismatch:true});

      }
      else{
        confirmpasswordcontrol.setErrors(null);
      }
    }
  }
  onSubmit()
  {
    this.service.setPassword(this.signupId,this.confirmForm.value.password).subscribe(
      {
        next:(res)=>
          {
            console.log("Password set Successfully");
            
            this.router.navigate(['/login'],{queryParams:{msg:'password-set'}});
            this.resetForm();
          },
        error:(err)=>
        {
          if (err.status === 200) {
          console.log("Password set Successfully (empty response)");
          this.router.navigate(['/login'], { queryParams: { msg: 'password-set' } });
          return;
        }

          
          alert("Couldn't set the password . Try again.");
          this.resetForm();
          
        }
      });

  }
   resetForm()
  {
    this.confirmForm.reset();
      
  }

}
