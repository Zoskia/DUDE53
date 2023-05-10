import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
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
      const response$ = this.http.post('http://localhost:3000/user/sign-up', this.signInForm.value);
      const response = await lastValueFrom(response$);
      console.log(response);
      this.router.navigate(['/auth']);
    } catch (error: any) {
      console.error('Error during sign up:', error);
      alert(`Error during sign up: ${error.error.message}`);
      this.router.navigate(['/sign-up']);
    }
  }
}
