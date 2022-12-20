import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalService } from './external.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-finance-analyzer-angular';
  timer! : NodeJS.Timer
  tokenTimeout : number = 180000
  constructor(private ext:ExternalService, private router: Router){}

  ngOnInit(): void {
    this.timer = setInterval(()=>this.intervalFunction(this),1000)
  }
  intervalFunction(ref:any){
    if(!ref.timer){
      ref.timer = setInterval(()=>ref.intervalFunction(ref),1000)
      return
    }
    const tokenTime = sessionStorage.getItem('tokenTime');
      if(tokenTime){
        const tokenTimeDate = Number(tokenTime)
        const currentTimeDate = Date.now()
        if((currentTimeDate-tokenTimeDate)>=ref.tokenTimeout){
          clearInterval(ref.timer)
          let data = confirm("Session time out. Do you want to continue?")
          if(data){
            ref.ext.post('/refreshToken',{},[],true).subscribe((res:any)=>{
              if(res?.status==='success'){
                sessionStorage.setItem('token',res.token);
                sessionStorage.setItem('tokenTime',Date.now().toString());
                ref.timer = setInterval(()=>ref.intervalFunction(ref),1000)
              }
              else{
                ref.router.navigateByUrl('/')
              }
            })
          }
          else{
            sessionStorage.clear()
            this.router.navigateByUrl('/login')
          }
        }
      }
  }
}
