import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3939/api/user";

  // BehaviorSubject - keep track of latest value(login status)
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  private authCheckComplete = false;

  constructor(private http: HttpClient) { 
    this.checkAuthOnLoad();
  }

  checkAuthOnLoad(): Observable<boolean> {
    if (this.authCheckComplete) {
      return of(this.isAuthenticatedSubject.value);
    }

    return this.http.get(`${this.baseUrl}/profile`, { withCredentials: true }).pipe(
      map((response: any) => {
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(response.username);
        this.authCheckComplete = true;
        return true;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        this.usernameSubject.next(null);
        this.authCheckComplete = true;
        return of(false);
      })
    );
  }

  /* Check if User is authenticated */
  // private checkAuthStatus(): Observable<boolean> {
  //   return this.http.get(`${this.baseUrl}/profile`, { withCredentials: true}).pipe(
  //     tap((user: any) => {
  //       // If profile request is successful, user is authenticated
  //       this.isAuthenticatedSubject.next(true);
  //       this.usernameSubject.next(user.username);
  //     }),
  //     tap(() => {
  //       // If request fails, user is not authenticated
  //       this.isAuthenticatedSubject.next(false);
  //       this.usernameSubject.next(null);
  //     }
  //   ));
  // }
  

  signup(username: string, email: string, password: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`, {username, email, password}, { withCredentials: true});
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, { email, password}, { withCredentials: true}).pipe(
      tap((response: any) => {
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(response.user.username);
      })
    );
  }



  logout(): Observable<any>{
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true}).pipe(
      tap( () => {
        this.isAuthenticatedSubject.next(false);
        this.usernameSubject.next(null);
      })
    );
  }

  getUserInfo(): Observable<any>{
    return this.http.get(`${this.baseUrl}/profile`, { withCredentials: true}).pipe(
      tap((user: any) => {
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(user.username);
      }),
    );
  }


  // getTokenFromCookies(): string | null {
  //   return this.cookieService.get('authToken') || null;
  // }
}


