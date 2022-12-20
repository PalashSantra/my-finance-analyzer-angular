import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isSessionTimeOutSource : any
  isSessionTimeOut : any

  private loaderSource : any
  loader : any

  constructor() { 
    this.isSessionTimeOutSource = new BehaviorSubject<any>({});
    this.isSessionTimeOut = this.isSessionTimeOutSource.asObservable()
    this.loaderSource = new BehaviorSubject<any>({});
    this.loader = this.loaderSource.asObservable()
  }
  
  spinnerWork(message:string,status : boolean, cb?:Function){
    this.loaderSource.next({'message': message, 'isSpinning': status})
    if(cb) cb()
  }
  callRefreshTokenIfRequired(ref:any,cb:Function){
    const tokenTime = sessionStorage.getItem('tokenTime');
      if(tokenTime){
        const tokenTimeDate = Number(tokenTime)
        const currentTimeDate = Date.now()
        if((currentTimeDate-tokenTimeDate)<=180000){
            ref.ext.post('/refreshToken',{},[],true).subscribe((res:any)=>{
              if(res?.status==='success'){
                sessionStorage.setItem('token',res.token);
                sessionStorage.setItem('tokenTime',Date.now().toString());
                cb()
              }
              else{
                sessionStorage.clear()
                ref.router.navigateByUrl('/')
              }
            })
        }
      }
  }
}
