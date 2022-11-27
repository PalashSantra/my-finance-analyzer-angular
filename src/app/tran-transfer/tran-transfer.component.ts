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
  selector: 'app-tran-transfer',
  templateUrl: './tran-transfer.component.html',
  styleUrls: ['./tran-transfer.component.css']
})
export class TranTransferComponent implements OnInit {

  validateForm: FormGroup;
  ledgerList: {id: string, name: string}[] = []
  ledgerFullList : ledgerFull[] = []

  tags : string[] = []

  constructor(private fb: FormBuilder, private tran:TransactionService, private message: NzMessageService) {
    this.validateForm = new FormGroup({
      userName: new FormControl('',[<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
      remember: new FormControl()
    });
    //this.getLedgerList()
    this.getTagList()
   }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      datePicker: new FormControl('',[<any>Validators.required])
    });
    this.validateForm = this.fb.group({
      datePicker: [null],
    });

    this.tran.ledgerList.subscribe((res:[])=>{
      console.log(res)
      if(Array.isArray(res)){
        this.ledgerFullList = res
        this.ledgerList = []
        this.validateForm.get('tranLedger')?.reset()
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

  submitForm(): void {
    console.log(this.validateForm.value);
  }

  getLedgerList(){
    const postData = {
      user_id:sessionStorage.getItem('user'),
      name:""
    }
    this.tran.getLedgers(postData)
  }

  private getTagList(){
    this.tags.push('investment')
  }

}
