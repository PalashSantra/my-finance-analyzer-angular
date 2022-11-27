import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  message : string = "Loading..."
  loading : boolean = false

  constructor(private ref: ChangeDetectorRef, private common : CommonService, private tran : TransactionService) { }

  ngOnInit(): void {
    this.common.loader.subscribe((res:any)=>{
      if(res?.message && res?.isSpinning){
        this.message = res?.message
        this.loading = res?.isSpinning
      }
    })
    this.tran.loader.subscribe((res:any)=>{
      if(res){
        this.message = res?.message
        this.loading = res?.isSpinning
        this.ref.detectChanges()
      }
    })
  }

}
