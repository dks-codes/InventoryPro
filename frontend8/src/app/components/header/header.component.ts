import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // Listen for authentication changes
    this.authService.isAuthenticated$.subscribe(loginstatus => {
      this.isLoggedIn = loginstatus;
    });

    // Listen for username updates
    this.authService.username$.subscribe(Uname => {
      this.username = Uname;
    });
  }

  logout(): void{
    this.authService.logout().subscribe( () => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);  // Redirect to login page after logout
      this.showSnackbar("Logged out successfully!", 'Close', 'success-snackbar');

    },
    (err) => {
      console.error("Logout failed: ", err);
      this.showSnackbar("Logout failed!", 'Close', 'error-snackbar');
    }
    );
  }

  showSnackbar(message: string, action: string, panelClass: string = ''){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass
    })
  }
}
