import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {

  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      employeeId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { employeeId, password } = this.loginForm.value;
      
      this.api.employeeLogin(employeeId, password).subscribe({
        next: (response) => {
          this.loading = false;
          localStorage.setItem('employeeId', response.employee.employee_id);
          localStorage.setItem('employeeName', response.employee.name);
          
          this.snackBar.open('Login successful! Welcome ' + response.employee.name, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/employee/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Invalid employee ID or password', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  goToCustomerLogin() {
    this.router.navigate(['/login']);
  }
}
