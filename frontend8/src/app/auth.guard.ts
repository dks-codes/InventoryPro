import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // return this.authService.isAuthenticated$.pipe(
        //   map(isLoggedIn => {
        //     if (!isLoggedIn && state.url !== '/login') {
        //       this.router.navigate(['/login']);
        //       return false;
        //     }
        //     if (isLoggedIn && state.url === '/login') {
        //       this.router.navigate(['/']);
        //       return false;
        //     }
        //     return true;
        //   })
        // );

        return this.authService.checkAuthOnLoad().pipe(
          switchMap(() => this.authService.isAuthenticated$),
          map(isLoggedIn => {
            if (!isLoggedIn && state.url !== '/login') {
              this.router.navigate(['/login']);
              return false;
            }
            if (isLoggedIn && state.url === '/login') {
              this.router.navigate(['/']);
              return false;
            }
            return true;
          }),
          take(1)  // Important: complete the observable after first emission
        );
    }
  }
