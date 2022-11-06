import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  //Need to change for production
  private baseUrl = "http://localhost"
  private headers : HttpHeaders

  constructor(private http: HttpClient, private cookie: CookieService) { 
    this.headers = new HttpHeaders()
    let token = cookie.get("token")
    if(token){
      this.headers.set('Authorization','Bearer '+ token)
    }
  }

  public get(url:String,params:Array<any>) : Observable<any> {
      return this.http.get(this.baseUrl+url,this.createOption(params))
              .pipe(catchError(this.handleError)); 
  }
  public post(url:String,body:any,params:Array<any>) : Observable<any> {
    return this.http.post(this.baseUrl+url,body,this.createOption(params))
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

  private createOption(params:Array<any>) : any{
    const paramSet : HttpParams = new HttpParams();
      params.forEach(item=>{
        paramSet.set(item.param,item.value)
      })
      return {
        'headers':this.headers,
        'params':paramSet
      }
  }
  
}
