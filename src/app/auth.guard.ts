import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExternalService } from './external.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private ext:ExternalService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true
      
  }
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(sessionStorage.getItem('token')){
      this.ext.post('/validateToken',{},[]).subscribe(res=>{
        if(res?.status==='error'){
          this.ext.changeSession(true,route.url)
          return false;
        }else if(res?.status==='success'){
          return true;
        }
        else{
          this.router.navigate(['/login'])
          return false;
        }
      })
      return true;
    }else if(sessionStorage.getItem('refreshToken')){
      this.ext.post('/refreshToken',{},[],true).subscribe(res=>{
        if(res?.status==='success'){
          sessionStorage.setItem('user',res.user_id);
          sessionStorage.setItem('token',res.token);
        }
        else{
          this.router.navigateByUrl('/')
        }
      })
      return true;
    }
    else{
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
