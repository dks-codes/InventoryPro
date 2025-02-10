import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService
      ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest  = req.clone({
        withCredentials: true
        });
        
        // return next.handle(authReq).pipe(
        //     catchError((error: HttpErrorResponse) => {
        //     if (error.status === 401) {
        //         // this.authService.isAuthenticatedSubject.next(false);
        //         this.router.navigate(['/login']);
        //     }
        //     return throwError(error);
        //     })
        // );

        return next.handle(clonedRequest);
  }
}