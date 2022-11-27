import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalService extends CommonService {
  //Need to change for production
  private baseUrl = "http://localhost"
  private headers : HttpHeaders
 

  constructor(private http: HttpClient, private cookie: CookieService) { 
    super()
    this.headers = new HttpHeaders()
  }

  private createHeader(isRefreshTokenRequired:boolean){
    this.headers = new HttpHeaders()
    let token
    if(isRefreshTokenRequired){
      token = sessionStorage.getItem('refreshToken')
      if(token){
        this.headers = this.headers.set('refreshtoken', token)
      }
    }else{
      token = sessionStorage.getItem("token")
      if(token){
        this.headers = this.headers.set('Authorization','Bearer '+ token)
      }
    }
  }

  public get(url:String,params:Array<any>,isRefreshTokenRequired:boolean = false) : Observable<any> {
      return this.http.get(this.baseUrl+url,this.createOption(params,isRefreshTokenRequired))
              .pipe(catchError(this.handleError)); 
  }
  public post(url:String,body:any,params:Array<any>,isRefreshTokenRequired:boolean = false) : Observable<any> {
    return this.http.post(this.baseUrl+url,body,this.createOption(params,isRefreshTokenRequired))
            .pipe(catchError(this.handleError)); 
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=> new Error(errorMessage));
  }

  private createOption(params:Array<any>,isRefreshTokenRequired:boolean) : any{
    const paramSet : HttpParams = new HttpParams();
    this.createHeader(isRefreshTokenRequired)
      params.forEach(item=>{
        paramSet.set(item.param,item.value)
      })
      return {
        'headers':this.headers,
        'params':paramSet
      }
  }
  
  
}
