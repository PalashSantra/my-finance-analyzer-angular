import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExternalService } from '../external.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrm: FormGroup;
  loginError: boolean = false

  constructor(private fb: FormBuilder, 
    private ext:ExternalService, 
    private cookie: CookieService, 
    private router:Router) { 
    this.loginFrm = new FormGroup({
      userName: new FormControl('',[<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
      remember: new FormControl()
    });
  }

  ngOnInit(): void {
      this.loginFrm = new FormGroup({
        userName: new FormControl('',[<any>Validators.required]),
        password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
        remember: new FormControl()
      });
  }


  submitForm(): void {
    if (this.loginFrm.valid) {
      const body = {
        'email' : this.loginFrm.get('userName')?.value,
        'password': this.loginFrm.get('password')?.value
      }
      this.ext.post('/loginMe',body,[]).subscribe((res)=>{
        console.log(res)
        if(res?.status==='success'){
          sessionStorage.setItem('user',res.user_id);
          sessionStorage.setItem('token',res.token);
          sessionStorage.setItem('refreshToken',res.refreshToken);
          this.router.navigateByUrl('/')
        }else{
          this.loginError = true
        }
      })
      console.log('submit', this.loginFrm.value);
    } else {
      Object.values(this.loginFrm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
