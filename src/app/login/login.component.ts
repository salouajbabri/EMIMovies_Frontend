import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string ="";
  email: string ="";
  password: string ="";
  


  constructor(private http: HttpClient ,private router :Router, private auth : AuthService)
  {

  }
  navigate()
  {
    this.router.navigateByUrl("/signup");
  }
  save()
  {
  
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password
    };
    this.http.post("http://localhost:8080/api/v1/user/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registered Successfully");
        this.auth.updateAuthenticationStatus(true);

    });
    this.router.navigateByUrl("");
  }
}





