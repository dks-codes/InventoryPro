import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  // isAuthenticated$ = this.authStatus.asObservable();
  private apiUrl = `${environment.apiUrl}/user`
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      map((res: any) => {
        this.authStatusSubject.next(true); 
        this.isAdminSubject.next(res.role === 'admin'); 
        return res;
      })
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password }, { withCredentials: true }).pipe(
      map((res: any) => {
        this.authStatusSubject.next(true);
        this.isAdminSubject.next(res.role === 'admin');
        return res;
      })
    );;
  }
  
  isAuthenticated(): boolean{
    return this.authStatusSubject.value;
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }


  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.authStatusSubject.next(false)));
  }
}
