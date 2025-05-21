import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseHandlerService } from './response-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7022/api';

  constructor(private http: HttpClient, private responseHandler: ResponseHandlerService) {}

  post<T>(endpoint: string, body: any, successMsg?: string, errorMsg?: string): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body).pipe(
      map((res) => this.responseHandler.handleSuccess(res, successMsg)),
      catchError((error) => {
        this.responseHandler.handleError(error, errorMsg);
        return throwError(() => error);
      })
    );
  }

  // similarly for get, put, delete methods
}
