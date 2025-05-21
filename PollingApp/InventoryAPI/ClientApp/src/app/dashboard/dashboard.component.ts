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
}


  

//   polls: PollDto[] = [];
//   currentPage = 1;
//   pageSize = 10;
//   totalPages = 1;
//   cols: number = 4;
//   question: string = '';
//     searchQuery: string = '';

//   constructor(private http: HttpClient, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.setGridCols(window.innerWidth);
//     this.loadPolls();
//   }

//   // Automatically adjust grid layout on window resize
//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.setGridCols(event.target.innerWidth);
//   }

//   setGridCols(width: number) {
//     if (width <= 600) {
//       this.cols = 1;
//     } else if (width <= 960) {
//       this.cols = 3;
//     } else {
//       this.cols = 4;
//     }
//   }

//   loadPolls(): void {
//     this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/all?page=${this.currentPage}&pageSize=${this.pageSize}`)
//       .subscribe({
//         next: res => {
//           if (res.success) {
//             this.polls = res.data;
//             // Set this properly based on your API response in real scenario
//             this.totalPages = Math.ceil(100 / this.pageSize); // Replace 100 with real total count if available
//           }
//         },
//         error: err => {
//           console.error('Failed to load polls:', err);
//         }
//       });
//   }


//  searchPoll(): void {
//     if (!this.searchQuery.trim()) {
//       this.loadPolls();
//       return;
//     }

//     this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/GetPollByName?search=${this.searchQuery}`)
//       .subscribe({
//         next: res => {
//           if (res.success && res.data) {
//             this.polls = res.data;
//           } else {
//             this.polls = [];
//           }
//         },
//         error: err => {
//           console.error('Search failed:', err);
//           this.polls = [];
//         }
//       });
//   }


//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.loadPolls();
//     }
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.loadPolls();
//     }
//   }

//   openPollDialog(poll: PollDto): void {
//     const dialogRef = this.dialog.open(PollDialogComponent, {
//       width: '400px',
//       data: poll
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result === 'voted') {
//         this.loadPolls(); // refresh polls to get updated vote counts
//       }
//     });
//   }
//}

// import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

// interface OptionDto {
//   id: number;
//   text: string;
//   voteCount: number;
// }

// interface PollDto {
//   id: number;
//   question: string;
//   createdAt: Date;
//   expirationDate: Date;
//   totalVotes: number;
//   options: OptionDto[];
// }

// interface PollApiResponse {
//   data: PollDto[];
//   message: string;
//   success: boolean;
//   statusCode: number;
// }

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent implements OnInit {
//   displayedColumns: string[] = ['question', 'createdAt', 'expirationDate', 'totalVotes', 'actions'];
//   dataSource!: MatTableDataSource<PollDto>;
//      polls: PollDto[] = [];
//   currentPage = 1;
//   pageSize = 10;
//   totalPages = 1;
//   cols: number = 4;
//   question: string = '';
//     searchQuery: string = '';


//       constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.setGridCols(window.innerWidth);
//     this.loadPolls();
//   }

//   // Automatically adjust grid layout on window resize
//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.setGridCols(event.target.innerWidth);
//   }

//   setGridCols(width: number) {
//     if (width <= 600) {
//       this.cols = 1;
//     } else if (width <= 960) {
//       this.cols = 3;
//     } else {
//       this.cols = 4;
//     }
//   }

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;



 
//   loadPolls(): void {
//     this.http.get<PollApiResponse>('https://localhost:7022/api/Poll/all?page=1&pageSize=100')
//       .subscribe({
//         next: (res) => {
//           if (res.success) {
//             this.dataSource = new MatTableDataSource(res.data);
//             this.dataSource.paginator = this.paginator;
//             this.dataSource.sort = this.sort;
//           }
//         },
//         error: (err) => {
//           console.error('Failed to load polls:', err);
//         },
//       });
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
//     this.dataSource.filter = filterValue;
//   }

//   openPollDialog(poll: PollDto): void {
//     // your dialog logic here
//   }


//    searchPoll(): void {
//     if (!this.searchQuery.trim()) {
//       this.loadPolls();
//       return;
//     }

//     this.http.get<PollApiResponse>(`https://localhost:7022/api/Poll/GetPollByName?search=${this.searchQuery}`)
//       .subscribe({
//         next: res => {
//           if (res.success && res.data) {
//             this.polls = res.data;
//           } else {
//             this.polls = [];
//           }
//         },
//         error: err => {
//           console.error('Search failed:', err);
//           this.polls = [];
//         }
//       });
//   }

// }
