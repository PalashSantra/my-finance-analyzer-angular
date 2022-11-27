import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-ledger-entry',
  templateUrl: './ledger-entry.component.html',
  styleUrls: ['./ledger-entry.component.css']
})
export class LedgerEntryComponent implements OnInit {

  @Input() drawerVisible: boolean = false;
  @Output() drawerStatus = new EventEmitter<boolean>();
  ledgerForm!: FormGroup;

  ledgerGroup: string[] = []
  ledgerType: string[] = []
  ledgerSubType: string[] = []

  selectedGroup : string = ""
  selectedType : string = ""
  selectedSubType : string = ""

  ledgerObject = [
    {
      'name':'Bank',
      'list': [
        {'name':'Savings','list':[]},
        {'name':'Current','list':[]},
        {'name':'Salary','list':[]},
        {'name':'International','list':[]}
      ]
    },
    {
      'name':'Credit Card',
      'list' :[
        {'name':'Free','list':[]},
        {'name':'Chargeable','list':[]}
      ]
    },
    {
      'name':'Investment', 
      'list':[
        {'name':'Secured','list':['PPF','Gold Bond','SSS','NSS','KVP','SCS','RBI Bond','FD','Recurring','NPS','TB']},
        {'name':'Insurance','list':['Term','Health','Car','Bike','Life','Appliances']},
        {'name':'Mutual Fund','list':['ELSS','ELC','EMC','ESC','EB','Debt','Sectoral']},
        {'name':'Stocks','list':[]},
        {'name':'Crypto','list':[]}
      ]
    },
    {
      'name':'Loan', 
      'list': [
        {'name':'Co-latteral','list':['House','Car','Bike','Consumer-Durable','Gold']},
        {'name':'Non-co-latteral','list':['Personal','Credit Card Loan','Credit EMI','Outside Loan']}
      ]
    },
    {
      'name':'Cash', 
      'list' : [
        {'name':'Cash-in-hand','list':[]}
      ]
    }
  ]
  
  constructor(private fb: FormBuilder, private tran:TransactionService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.ledgerForm = this.fb.group({
      ledName : [null,[<any>Validators.required]],
      ledGroup : [null,[<any>Validators.required]],
      ledType : [],
      ledSubType : []
    })

    this.tran.resultStatusLedger.subscribe((res: string)=>{
      if(res && res==='success'){
        this.createMessage('success','Transaction saved.')
        this.ledgerForm.reset()
        this.tran.spinnerWork('',false)
      }
      else if(res && res==='error'){
        this.createMessage('error','Transaction failed to save.')
        this.tran.spinnerWork('',false)
      }
    })

    this.ledgerGroup = this.ledgerObject.map(obj=>obj.name)
  }

  ledgerSubmitForm(){
    if (this.ledgerForm.valid) {
      const postData = {
        "name": this.ledgerForm.get('ledName')?.value,
        "group": this.ledgerForm.get('ledGroup')?.value,
        "type": {
          "cat1": this.ledgerForm.get('ledType')?.value,
          "cat2": this.ledgerForm.get('ledSubType')?.value
        },
        "user_id":sessionStorage.getItem('user')
      }
      this.tran.saveLedger(postData)
    }
    else {
      Object.values(this.ledgerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  resetForm(){
    this.ledgerForm.reset()
  }

  changeGroup(){
    if(this.selectedGroup!==""){
      const selectedObjectForGroup = this.ledgerObject.find(obj=>obj.name===this.selectedGroup)?.list
      if(selectedObjectForGroup && selectedObjectForGroup?.length>0){
        this.ledgerType = selectedObjectForGroup.map(item=>item.name)
      }
    }
    this.selectedType = ""
    this.selectedSubType = ""
  }
  changeType(){
    if(this.selectedType!==""){
      const selectedObjectForGroup = this.ledgerObject.find(obj=>obj.name===this.selectedGroup)?.list
      if(selectedObjectForGroup && selectedObjectForGroup?.length>0){
        const selectedObjectForType = selectedObjectForGroup.find(item=>item.name===this.selectedType)?.list
        if(selectedObjectForType && selectedObjectForType?.length>0){
          this.ledgerSubType = selectedObjectForType.map(item=>item)
        }
      }
    }
    this.selectedSubType = ""
  }

  drawerClose(){
    this.drawerStatus.emit(false)
    this.drawerVisible = false
  }

  createMessage(type: string,msg: string): void {
    const msgComp = this.message.create(type, msg, {
      nzDuration: 2000
    }).onClose!.subscribe(()=>this.drawerVisible=false)
  }

}
