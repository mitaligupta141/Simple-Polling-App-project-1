import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    // Example: check if token exists and not expired
    const token = localStorage.getItem('token');
    return !!token;  // Simple example; improve with expiration check
  }
}