import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-ledger-balance-drawer',
  templateUrl: './ledger-balance-drawer.component.html',
  styleUrls: ['./ledger-balance-drawer.component.css']
})
export class LedgerBalanceDrawerComponent implements OnInit {

  @Input() drawerVisible: boolean = false;
  @Input() position: NzDrawerPlacement = 'right';
  @Output() drawerStatus = new EventEmitter<boolean>();

  actualPosition!: NzDrawerPlacement;
  ledgerBalanceData!: any
  
  
  constructor(private tran: TransactionService) { }
  

  ngOnInit(): void {
    this.actualPosition = this.position as NzDrawerPlacement
    console.log(this.actualPosition)
    this.tran.getLedgerBalance({user_id:sessionStorage.getItem('user')})
    this.tran.resultStatus.subscribe((res: string)=>{
      if(res && res==='success'){
        this.tran.getLedgerBalance({user_id:sessionStorage.getItem('user')})
      }
    })
    this.tran.ledgerBalance.subscribe((res:any)=>{
      if(Array.isArray(res)){
        this.ledgerBalanceData = res
        console.log('this.ledgerBalanceData',this.ledgerBalanceData)
        this.tran.spinnerWork('',false)
      }
    })
  }

  drawerClose(){
    this.drawerStatus.emit(false)
    this.drawerVisible = false
  }

  

}
