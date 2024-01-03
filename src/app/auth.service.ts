import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; 

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  logout(): void {
   
    this.updateAuthenticationStatus(false);
    !this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

   updateAuthenticationStatus(status: boolean): void {
    console.log('Updating authentication status:', status);
    this.isLoggedInSubject.next(status);
  }
}
