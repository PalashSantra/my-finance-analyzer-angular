import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-tran-list',
  templateUrl: './tran-list.component.html',
  styleUrls: ['./tran-list.component.css']
})
export class TranListComponent implements OnInit {

  dataSet: any[] = []
  total: number = 1
  pageSize: number = 5
  pageIndex: number = 1
  loading : boolean = false
  constructor(private tran:TransactionService) { }

  ngOnInit(): void {
    this.tran.transactionList.subscribe((res:any)=>{
      if(Array.isArray(res?.data)){
        const data:any[] = []
        res.data.forEach((item: any)=>{
          data.push({
            'date': item.tran_date.split('T')[0],
            'ledger' : item.ledger,
            'ledger_detail' : item.ledger.group?item.ledger.group:''
                              +item.ledger.type.cat1?'|' + item.ledger.type.cat1: ''
                              +item.ledger.type.cat2?'|' + item.ledger.type.cat2:'',
            'cost' : item.cost,
            'cr' : item.tran_type==='CR'? true : false,
            'particulars' : item.particulars
          })
        })
        this.dataSet = data
        this.total = res.total
        this.loading = false
      }
      this.tran.spinnerWork('',false)
    })
    this.tran.resultStatus.subscribe((res: string)=>{
      if(res && res==='success'){
        this.loading = true
        this.tran.getTransactions(postData)
      }
    })
    const postData = {
      user_id:sessionStorage.getItem('user'),
      page:this.pageIndex,
      pageSize:this.pageSize,
    }
    this.loading = true
    this.tran.getTransactions(postData)
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    const postData = {
      user_id:sessionStorage.getItem('user'),
      'page':pageIndex,
      'pageSize':pageSize,
    }
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.loading = true
    this.tran.getTransactions(postData);
  }

}
