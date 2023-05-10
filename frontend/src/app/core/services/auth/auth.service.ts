import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {}

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated.next(value);
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
}
