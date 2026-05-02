import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  errorMessage:string='';
  successMessage!:string;

  constructor(private fb:FormBuilder,private service:AuthServiceService,private route:Router,private activeroute:ActivatedRoute){}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    
    this.activeroute.queryParams.subscribe((params)=>{
      if(params['msg']=='password-set')
      {
        this.successMessage='password set successfully.Please Login..';
        setTimeout(() => {
      this.successMessage = '';
      }, 3000);

      }
    });
  }
  onLogin(){
    const logindata={
     email:this.loginForm.value.email,
     password:this.loginForm.value.password
    }
    if (this.loginForm.invalid) return;

    this.service.login(logindata).subscribe({
      next:(value)=>{
        console.log(value);
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('token',value.token);
        localStorage.setItem('ProviderId',value.id);
        this.service.getCompany(value.id).subscribe((res)=>
        {
          if(res.length>0)
          {
            localStorage.setItem('companyId',res[0].id);
            
          }
        });
        this.route.navigate(['/home']);

      },
      error:(err)=>{
        if (err.status === 400 || err.status === 401) {
        this.errorMessage = "Invalid email or password";
      } else {
        this.errorMessage = "Something went wrong. Please try again.";
      }

      }
    });
  }
  


}
