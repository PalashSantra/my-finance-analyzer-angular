import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransactionService } from '../transaction.service';

interface ledgerFull {
  _id:string,
  name: string,
  group: string,
  type: {
    cat1:string,
    cat2: string,
    _id: string
  },
  __v: string
}
@Component({
  selector: 'app-tran-entry',
  templateUrl: './tran-entry.component.html',
  styleUrls: ['./tran-entry.component.css']
})



export class TranEntryComponent implements OnInit {

  validateForm!: FormGroup;
  ledgerList: {id: string, name: string}[] = []
  ledgerFullList : ledgerFull[] = []
  tags : string[] = []

  drawerVisible : boolean = false

  constructor(private fb: FormBuilder, private tran:TransactionService, private message: NzMessageService) {
   }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tranDate: [null,[<any>Validators.required]],
      tranType: [],
      tranAmount:[null,[<any>Validators.required,<any>Validators.pattern('[0-9]*')]],
      tranUnit: [null,[<any>Validators.pattern('[1-9]*')]],
      tranLedger:[null,[<any>Validators.required]],
      tranParticulars: [null,[<any>Validators.required]],
      tranTags: []
    })
    this.getLedgerList()
    this.getTagList()

    this.tran.resultStatus.subscribe((res: string)=>{
      if(res && res==='success'){
        this.createMessage('success','Transaction saved.')
        this.validateForm.reset()
        this.tran.spinnerWork('',false)
      }
      else if(res && res==='error'){
        this.createMessage('error','Transaction failed to save.')
        this.tran.spinnerWork('',false)
      }
    })
    this.tran.ledgerList.subscribe((res:[])=>{
      console.log(res)
      if(Array.isArray(res)){
        this.ledgerFullList = res
        this.ledgerList = []
        res.forEach((item: { _id: any; name: any; })=>{
          this.ledgerList.push({
            'id': item._id,
            'name': item.name
          });
        })
        this.tran.spinnerWork(' ',false)
      }
    })

    
  }
  submitForm(){
    if (this.validateForm.valid) {
      const postData = {
        "tran_date": this.formatDate(this.validateForm.get('tranDate')?.value),
        "particulars": this.validateForm.get('tranParticulars')?.value,
        "cost": {
          "amount": this.validateForm.get('tranAmount')?.value,
          "unit": this.validateForm.get('tranUnit')?.value
        },
        "tran_type": this.validateForm.get('tranType')?.value?'CR':'DR',
        "ledger": this.ledgerFullList.find(item => item._id===this.validateForm.get('tranLedger')?.value),
        "tags": this.validateForm.get('tranTags')?.value,
        "user_id":sessionStorage.getItem('user')
      }
      this.tran.saveTransaction(postData)
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

  resetForm(){
    this.validateForm.reset()
  }

  getLedgerList(){
    const postData = {
      user_id:sessionStorage.getItem('user'),
      name:""
    }
    this.tran.getLedgers(postData)
  }

  openDrawer(){
    this.drawerVisible = true
  }
  drawerClose(status : boolean){
    this.drawerVisible = status
  }
  private getTagList(){
    this.tags.push('investment')
  }
  private formatDate(val:any){
    return val.getFullYear()+'-'+(Number(val.getMonth())+1)+'-'+val.getDate()
  }
  createMessage(type: string,msg: string): void {
    this.message.create(type, msg, {
      nzDuration: 4000
    });
  }
}
