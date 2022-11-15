import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = new FormGroup({
      userName: new FormControl('',[<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
      remember: new FormControl()
    });
   }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      datePicker: new FormControl('',[<any>Validators.required])
    });
    this.validateForm = this.fb.group({
      datePicker: [null],
    });
  }

  submitForm(): void {
    console.log(this.validateForm.value);
  }

}
