import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  signInForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    try {
      const response$ = this.http.post('http://localhost:3000/user/auth', this.signInForm.value);
      const response = await lastValueFrom(response$);
      console.log(response);
      this.authService.setIsAuthenticated(true);
      this.router.navigate(['']);
    } catch (error: any) {
      console.error('Error during sign up:', error);
      alert(`Error during sign up: ${error.error.message}`);
      this.router.navigate(['/auth']);
    }
  }
}
