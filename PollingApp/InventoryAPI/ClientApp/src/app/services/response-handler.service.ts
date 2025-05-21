import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor(private toastr: ToastrService) {}

  handleSuccess(response: any, customMessage?: string) {
    const message = customMessage || 'Operation successful.';
    this.toastr.success(message);
    return response;
  }

  handleError(error: any, customMessage?: string) {
    let message = customMessage || 'Something went wrong.';
    if (error?.status === 401) {
      message = 'Unauthorized. Please log in again.';
    } else if (error?.error?.message) {
      message = error.error.message;
    } else if (error?.message) {
      message = error.message;
    }

    this.toastr.error(message);
    throw error;  // rethrow so caller can catch if needed
  }
}