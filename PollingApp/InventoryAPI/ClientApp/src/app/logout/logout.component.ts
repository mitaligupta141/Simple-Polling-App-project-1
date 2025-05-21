import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

  import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  animations: [
    trigger('slideFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '400ms ease-in',
          style({ opacity: 0, transform: 'translateY(30px)' })
        )
      ])
    ]),
trigger('toggleFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.9)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
    ])
  ])

  ],
})
export class LogoutComponent {
 constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Remove token from localStorage (if stored there too)
    localStorage.removeItem('token');

    // Call API to remove cookie from backend
    this.http.post('https://localhost:7022/api/Account/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          // Redirect to login after logout
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error: () => {
          alert("Logout failed");
        }
      });
  }
}
