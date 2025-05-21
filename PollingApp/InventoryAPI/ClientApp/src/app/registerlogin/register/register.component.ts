import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
   animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class RegisterComponent {

  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isSubmitting = false;

  constructor(private http: HttpClient, private router: Router , private toastr: ToastrService) {}

 onSubmit() {
  if (this.isSubmitting) return;

  if (!this.signupData.username || !this.signupData.email || !this.signupData.password || !this.signupData.confirmPassword) {
    this.toastr.warning('Please fill in all required fields.', 'Validation');
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(this.signupData.email)) {
    this.toastr.warning('Enter a valid email address.', 'Validation');
    return;
  }

 const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

if (!passwordPattern.test(this.signupData.password)) {
  this.toastr.warning(
    'Password must be at least 6 characters, include one uppercase letter and one special character.',
    'Validation'
  );
  return;
}

  if (this.signupData.password !== this.signupData.confirmPassword) {
    this.toastr.error('Passwords do not match.', 'Validation');
    return;
  }

  const registerData = {
    username: this.signupData.username,
    email: this.signupData.email,
    password: this.signupData.password
  };

  this.isSubmitting = true;

  this.http.post('https://localhost:7022/api/Account/register', registerData).subscribe({
    next: () => {
      this.toastr.success('Registration successful!', 'Success');
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Registration failed. ' + (err.error?.message || ''), 'Error');
    },
    complete: () => {
      this.isSubmitting = false;
    }
  });
}

}
