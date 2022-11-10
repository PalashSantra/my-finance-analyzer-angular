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

  constructor(private ext:ExternalService, private router: Router){}

  ngOnInit(): void {
    this.ext.isSessionTimeOut.subscribe((res: { isSessionTimeOut: any; })=>{
      if(res?.isSessionTimeOut){
        let data = confirm("Session time out. Do you want to continue?")
        if(data){
          this.ext.post('/refreshToken',{},[],true).subscribe(res=>{
            if(res?.status==='success'){
              sessionStorage.setItem('user',res.user_id);
              sessionStorage.setItem('token',res.token);
            }
            else{
              this.router.navigateByUrl('/')
            }
          })
        }
        else{
          sessionStorage.clear()
          this.router.navigateByUrl('/login')
        }
      }
    })
  }
}
