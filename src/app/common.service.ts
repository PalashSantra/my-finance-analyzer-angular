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

  changeSession(isSessionTimeOut:boolean, path:any){
    this.isSessionTimeOutSource.next({'isSessionTimeOut': isSessionTimeOut,'path':path});
  }

  spinnerWork(message:string,status : boolean, cb?:Function){
    this.loaderSource.next({'message': message, 'isSpinning': status})
    if(cb) cb()
  }
}
