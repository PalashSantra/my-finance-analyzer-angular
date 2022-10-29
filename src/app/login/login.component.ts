import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrm: FormGroup;

  constructor(private fb: FormBuilder) { 
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
