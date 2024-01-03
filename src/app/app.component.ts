import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'movies_app';
  navbg:any;
  @HostListener('document:scroll') scrollover(){
    console.log(document.body.scrollTop, 'scrolllength#');
    if(document.body.scrollTop >0 || document.documentElement.scrollTop >0)
    {
      this.navbg = {
        'background-color': "black"
      }
    }else{
      this.navbg = {}
    }
  }

  isLoggedIn(): boolean {
    
    return this.authService.isUserLoggedIn();
  }

  logout(): void{
    this.authService.logout();
  }
 
}
