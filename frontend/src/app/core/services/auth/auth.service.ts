import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isAuthenticated.next(true);
    }
  }

  setIsAuthenticated(value: boolean, token: string) {
    if (value) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.isAuthenticated.next(value);
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
}
