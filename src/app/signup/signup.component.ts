import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {}

  Login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:8080/api/v1/user/login", bodyData).subscribe(
      (resultData: any) => {

        if (resultData.message === "Email not exists") {
          alert("Email not exists");
          this.auth.updateAuthenticationStatus(false);
        } else if (resultData.message === "Login Success") {
          // Update the authentication status
          this.auth.updateAuthenticationStatus(true);

          // Route to the home page
          this.router.navigateByUrl("");
        } else {
          alert("Incorrect Email and Password do not match");
          this.auth.updateAuthenticationStatus(false);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.auth.updateAuthenticationStatus(false);
      }
    );
  }
}
