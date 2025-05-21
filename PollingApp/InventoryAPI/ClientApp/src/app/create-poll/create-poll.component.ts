import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '.././services/api.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
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
export class CreatePollComponent {
  poll = {
    question: '',
    options: ['', ''], // Start with 2 options
  };

   error: string = '';
  constructor(private http: HttpClient,private apiService: ApiService, private router: Router , private toastr: ToastrService) {}

  addOption() {
    if (this.poll.options.length < 10) {
      this.poll.options.push('');
    }
  }

  removeOption(index: number) {
    if (this.poll.options.length > 2) {
      this.poll.options.splice(index, 1);
    }
  }

 submitPoll() {
  const trimmedOptions = this.poll.options
    .map(opt => opt.trim())
    .filter(opt => opt !== '');

  const payload = {
    question: this.poll.question.trim(),
    options: trimmedOptions,
  };

  this.http.post('https://localhost:7022/api/Poll/create', payload).subscribe({
    next: () => {
      this.toastr.success('Poll created successfully');
      this.router.navigate(['/polls']);
    },
    error: (err) => {
      if (err.status === 401) {
        this.toastr.error('Unauthorized. Please log in again.');
      } else if (
        err.error &&
        typeof err.error.message === 'string' &&
        err.error.message.includes('already exists')
      ) {
        this.toastr.error('A poll with the same question and options already exists.');
      } else {
        this.toastr.error('Failed to create poll.');
      }
    }
  });
}
}
