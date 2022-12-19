import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  balanceDrawerVisible : boolean = false
  ledgerDrawerVisible : boolean = false
  position : NzDrawerPlacement = 'left'
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
  closeBalanceDrawer(status : boolean){
    this.balanceDrawerVisible = status
  }
  openBalanceDrawer(data : any){
    if(data?.position && data?.balanceDrawerVisible){
      this.position = data.position,
      this.balanceDrawerVisible = data.balanceDrawerVisible
    }
  }
  closeLedgerDrawer(status : boolean){
    this.ledgerDrawerVisible = status
  }
  openLedgerDrawer(status : boolean){
    this.ledgerDrawerVisible = status
  }
  

}
