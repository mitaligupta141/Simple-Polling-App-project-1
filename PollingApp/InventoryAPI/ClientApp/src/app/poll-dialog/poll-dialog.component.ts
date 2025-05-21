import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poll-dialog',
  templateUrl: './poll-dialog.component.html',
  
})
export class PollDialogComponent {
  selectedOptionId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public poll: any,
    public dialogRef: MatDialogRef<PollDialogComponent>,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  castVote(): void {
    if (!this.selectedOptionId) {
      this.toastr.warning('Please select an option.');
      return;
    }

    const payload = {
      pollId: this.poll.id,
      optionId: this.selectedOptionId
    };

    this.http.post('https://localhost:7022/api/Vote/cast', payload)
      .subscribe({
        next: () => {
          this.toastr.success('Vote cast successfully!');
          this.dialogRef.close('voted');
        },
        error: (err) => {
          this.toastr.error(err.error || 'Failed to cast vote.');
        }
      });
  }
}
