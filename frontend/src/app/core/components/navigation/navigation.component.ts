import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.authService.setIsAuthenticated(false, '');
    this.router.navigate(['/auth']);
  }
}
