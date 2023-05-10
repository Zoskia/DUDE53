import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.authService.setIsAuthenticated(false);
    localStorage.removeItem('token');
  }
}
