import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExternalService } from '../external.service';

@Component({
  selector: 'app-tran-entry',
  templateUrl: './tran-entry.component.html',
  styleUrls: ['./tran-entry.component.css']
})
export class TranEntryComponent implements OnInit {

  validateForm!: FormGroup;
  ledgerList: {id: string, name: string}[] = []

  constructor(private fb: FormBuilder, private ext:ExternalService) {
    // this.validateForm = new FormGroup({
    //   tranDate: new FormControl('',[<any>Validators.required]),
    //   tranType: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
    //   tranAmount: new FormControl('',[<any>Validators.required]),
    //   tranUnit: new FormControl('',[]),
    //   tranLedger: new FormControl('',[<any>Validators.required]),
    //   tranParticulars: new FormControl('',[<any>Validators.required])
    // });
   }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tranDate: [null,[<any>Validators.required]],
      tranType: [null,[<any>Validators.required]],
      tranAmount:[null,[<any>Validators.required]],
      tranUnit: [],
      tranLedger:[null,[<any>Validators.required]],
      tranParticulars: [null,[<any>Validators.required]]
    })
    this.getLedgerList()
  }
  submitForm(){
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
    }
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  getLedgerList(){
    const postData = {
      user_id:sessionStorage.getItem('user'),
      name:""
    }
    this.ext.post('/ledger/list',postData,[]).subscribe(res=>{
      if(res?.status==='success'){
        res.result.forEach((item: { _id: any; name: any; })=>{
          this.ledgerList.push({
            'id': item._id,
            'name': item.name
          });
        })
      }else{
        console.log('error')
      }
    })
  }
}
