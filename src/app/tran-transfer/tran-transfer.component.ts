import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tran-transfer',
  templateUrl: './tran-transfer.component.html',
  styleUrls: ['./tran-transfer.component.css']
})
export class TranTransferComponent implements OnInit {

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
