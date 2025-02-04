import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Access the child component MatTabGroup. { static: false } ensures that tabGroup is accessed after the View is fully initialised
  @ViewChild(MatTabGroup, { static: false }) tabGroup!: MatTabGroup;

  // FormGroup to handle login and signup form validations
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  Onlogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log("Login successful!", response);
          this.showSnackbar("Login Successful!", 'Close', 'success-snackbar');
          this.router.navigate(['/']);    // Redirect to home page
        },
        (error) => {
          this.errorMessage = 'Invalid email or password. Please try again.';
          console.error('Login failed:', error);
          this.showSnackbar(this.errorMessage, 'Close', 'error-snackbar');
        }
      );
    } else {
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
      this.errorMessage = 'Please enter a valid email and password.';
      this.showSnackbar(this.errorMessage, 'Close', 'error-snackbar');
    }
  }

  Onsignup() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.authService.signup(username, email, password).subscribe(
        {
          next: () => {
            this.errorMessage = '';
            this.showSnackbar("User registered successfully!", 'Close', 'success-snackbar');
            this.tabGroup.selectedIndex = 0;
          },
          error: (error) => {
            console.log(error);
            if (error.status === 409) {
              // For conflict errors (usually duplicate username/email)
              this.errorMessage = 'Username or email already exists';
            } else {
              // Generic error message
              this.errorMessage = 'Signup failed. Please try again.';
            }
            this.showSnackbar(this.errorMessage, 'Close', 'error-snackbar');
          }
        }
      );
    } else {
      this.signupForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
      this.errorMessage = 'Please fill in all fields correctly.';
      this.showSnackbar(this.errorMessage, 'Close', 'error-snackbar');
    }
  }

  resetErrorMsg() {
    this.errorMessage = '';
  }

  // Open SnackBar
  showSnackbar(message: string, action: string, panelClass: string = '') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top', // Position of snackbar
      horizontalPosition: 'center',
      panelClass: panelClass // Custom CSS class
    });
  }
}
