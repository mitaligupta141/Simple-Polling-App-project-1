import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-show-vote',

  templateUrl: './show-vote.component.html',
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
export class ShowVoteComponent implements OnInit {
  votes: any[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['question', 'optionText', 'votedAt'];

  ngOnInit(): void {
    this.fetchVotes();
  }

  fetchVotes(): void {


    this.http.get<any>('https://localhost:7022/api/Vote/user-votes').subscribe({
      next: (res) => {
        console.log('API response:', res);
        this.votes = res.data;
      },
      error: (err) => {
        this.error = err.status === 401
          ? 'Unauthorized. Please log in again.'
          : err.error || 'Failed to fetch your votes.';
      },
    });
  }
}
