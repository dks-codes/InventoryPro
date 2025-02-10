import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService
      ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and set withCredentials to true for all requests
        const authReq = req.clone({
        withCredentials: true
        });
        
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                // console.log("Error: ",error)
            // Handle 401 Unauthorized errors
            if (error.status === 401) {
                this.authService.isAuthenticatedSubject.next(false);
                this.router.navigate(['/login']);
            }
            return throwError(error);
            })
        );
  }
}