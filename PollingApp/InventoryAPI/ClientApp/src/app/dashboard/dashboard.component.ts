import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PollDialogComponent } from '../poll-dialog/poll-dialog.component';
 import { trigger, transition, style, animate } from '@angular/animations';

interface OptionDto {
  id: number;
  text: string;
  voteCount: number;
}

interface PollDto {
  id: number;
  question: string;
  createdAt: Date;
  expirationDate: Date;
  totalVotes: number;
  options: OptionDto[];
}

interface PollApiResponse {
  data: PollDto[];
  message: string;
  success: boolean;
  statusCode: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {

  polls: PollDto[] = [];
  displayedColumns: string[] = ['question', 'createdAt', 'expirationDate', 'totalVotes', 'actions'];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  question: string = '';
  searchQuery: string = '';
  sortField: string = 'createdAt';
  sortDirection: string = 'asc';

   filterOptions = [
    { value: '', label: 'All Polls' },
    { value: 'active', label: 'Active Polls' },
    { value: 'expired', label: 'Expired Polls' },
    { value: 'popular', label: 'Popular Polls' }
  ];
  filterValue: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(): void {
    this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/all?page=${this.currentPage}&pageSize=${this.pageSize}`)
      .subscribe({
        next: res => {
          if (res.success) {
            this.polls = res.data;
            this.totalPages = Math.ceil(100 / this.pageSize); // Replace with actual total from API
          }
        },
        error: err => {
          console.error('Failed to load polls:', err);
        }
      });
  }

  searchPoll(): void {
    if (!this.searchQuery.trim()) {
      this.loadPolls();
      return;
    }

    this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/GetPollBySearch?search=${this.searchQuery}`)
      .subscribe({
        next: res => {
          this.polls = res.success ? res.data : [];
        },
        error: err => {
          console.error('Search failed:', err);
          this.polls = [];
        }
      });
  }

  toggleSort(field: string, direction: 'asc' | 'desc'): void {
    this.sortField = field;
    this.sortDirection = direction;

    const url = `https://localhost:7022/api/Poll/GetPollBySort?sortField=${field}&sortDirection=${direction}`;
    this.http.get<PollApiResponse>(url).subscribe({
      next: res => {
        if (res.success) {
          this.polls = res.data;
        }
      },
      error: err => {
        console.error('Sort failed:', err);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPolls();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPolls();
    }
  }

  openPollDialog(poll: PollDto): void {
    const dialogRef = this.dialog.open(PollDialogComponent, {
      width: '400px',
      data: poll
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'voted') {
        this.loadPolls();
      }
    });
  }
    filterPolls(): void {
    if (!this.filterValue) {
      this.loadPolls();
      return;
    }
  
    this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/GetPollByFilter?filter=${this.filterValue}`)
      .subscribe({
        next: res => this.polls = res.success ? res.data : [],
        error: err => {
          console.error('Filter failed:', err);
          this.polls = [];
        }
      });

    }
      dateFilterOptions = [
  { label: 'All Polls', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' }
];

selectedDateFilter = '';

filterByDateRange(): void {
  if (!this.selectedDateFilter) {
    this.loadPolls(); 
    return;
  }

  const today = new Date();
  let fromDate: string;
  let toDate: string;

  switch (this.selectedDateFilter) {
    case 'today':
      fromDate = toDate = this.formatDate(today);
      break;
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      fromDate = toDate = this.formatDate(yesterday);
      break;
    case 'last7days':
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      fromDate = this.formatDate(sevenDaysAgo);
      toDate = this.formatDate(today);
      break;
    default:
      return;
  }

  const url = `https://localhost:7022/api/Poll/FilterByDate?fromDate=${fromDate}&toDate=${toDate}`;
  this.http.get<PollApiResponse>(url).subscribe({
    next: res => {
      if (res.statusCode === 200) {
        this.polls = res.data;
      }
    },
    error: err => {
      console.error('Date filter failed:', err);
    }
  });
}

private formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // yyyy-MM-dd
}
  }
  

  
