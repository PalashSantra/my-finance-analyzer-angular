import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonService } from './common.service';
import { ExternalService } from './external.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends CommonService {

  private resultStatusSource : any
  resultStatus : any
  private ledgerListSource : any
  ledgerList : any
  private resultStatusLedgerSource : any
  resultStatusLedger: any

  constructor(private ext:ExternalService) { 
    super()
    this.resultStatusSource = new BehaviorSubject<any>({});
    this.resultStatus = this.resultStatusSource.asObservable()
    this.ledgerListSource = new BehaviorSubject<any>({});
    this.ledgerList = this.ledgerListSource.asObservable()
    this.resultStatusLedgerSource = new BehaviorSubject<any>({});
    this.resultStatusLedger = this.resultStatusLedgerSource.asObservable()
  }

  public saveTransaction(data:any){
    this.spinnerWork('Processing transaction...',true,()=>{
      this.ext.post('/transaction/save',data,[]).subscribe(res=>{
        this.resultStatusSource.next(res?.status)
      })
    })
  }
  public getLedgers(data:any){
    this.spinnerWork('Fetching ledgers...',true,()=>{
      this.ext.post('/ledger/list',data,[]).subscribe(res=>{
        if(res?.status === 'success')
          this.ledgerListSource.next(res?.result)
        else
            this.ledgerListSource.next([])
      })
    })
  }

  public saveLedger(data:any){
    this.spinnerWork('Saving ledgers...',true,()=>{
      this.ext.post('/ledger/save',data,[]).subscribe(res=>{
        if(res?.status === 'success'){
          const postData = {
            user_id:sessionStorage.getItem('user'),
            name:""
          }
          this.getLedgers(postData)
        }
        this.resultStatusLedgerSource.next(res?.status)
      })
    })
  }
}
