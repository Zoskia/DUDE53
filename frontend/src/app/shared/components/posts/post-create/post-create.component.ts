import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  postCreate: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.postCreate = this.formBuilder.group({
      name: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  ngOnInit() {
    // check authentication
    this.authService.getIsAuthenticated().subscribe((value) => {
      if (!value) {
        this.router.navigate(['/auth']);
      }
    });
  }

  async onSubmit() {
    if (this.postCreate.invalid) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    try {
      const response$ = this.http.post('http://localhost:3000/data', this.postCreate.value, { headers: headers });
      const response = await lastValueFrom(response$);
      console.log(response);
      this.router.navigate(['/post-list']);
    } catch (error: any) {
      console.error('Error during post creation:', error);
      alert(`Error during post creation: ${error.error.message}`);
      this.router.navigate(['/post-create']);
    }
  }
}
