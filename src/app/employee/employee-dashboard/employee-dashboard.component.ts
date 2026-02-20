import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { BillComponent } from '../../components/bill/bill.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];
  loading = false;
  activeFilter: string = 'All';
  employeeName: string = '';
  parseFloat = parseFloat;

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.employeeName = this.api.getEmployeeName();
    console.log('Employee Dashboard - Loading orders...');
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.api.getAllOrders().subscribe({
      next: (data) => {
        console.log('=== ORDERS LOADED ===');
        console.log('Total orders:', data.length);
        console.log('Orders data:', data);
        this.orders = data;
        this.filteredOrders = data;
        console.log('Filtered orders:', this.filteredOrders.length);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
        this.snackBar.open('Error loading orders: ' + error.message, 'Close', { duration: 5000 });
      }
    });
  }

  filterOrders(status: string) {
    this.activeFilter = status;
    if (status === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === status);
    }
  }

  acceptOrder(order: any) {
    if (order.status !== 'Pending') {
      this.snackBar.open('Only pending orders can be accepted', 'Close', { duration: 3000 });
      return;
    }

    this.api.updateOrderStatus(order.id, 'Accepted').subscribe({
      next: () => {
        order.status = 'Accepted';
        this.snackBar.open('Order accepted successfully', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Error updating order status', 'Close', { duration: 3000 });
      }
    });
  }

  cancelOrder(order: any) {
    if (order.status !== 'Pending') {
      this.snackBar.open('Only pending orders can be cancelled', 'Close', { duration: 3000 });
      return;
    }

    this.api.updateOrderStatus(order.id, 'Cancelled').subscribe({
      next: () => {
        order.status = 'Cancelled';
        this.snackBar.open('Order cancelled', 'Close', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Error updating order status', 'Close', { duration: 3000 });
      }
    });
  }

  viewBill(orderId: number) {
    this.api.getBillByOrderId(orderId).subscribe({
      next: (bill) => {
        this.dialog.open(BillComponent, {
          width: '800px',
          maxHeight: '90vh',
          data: bill
        });
      },
      error: () => {
        this.snackBar.open('Bill not found for this order', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Accepted': return 'status-accepted';
      case 'Cancelled': return 'status-cancelled';
      case 'Delivered': return 'status-delivered';
      default: return '';
    }
  }

  logout() {
    this.api.employeeLogout();
    this.router.navigate(['/employee/login']);
    this.snackBar.open('Logged out successfully', 'Close', { duration: 2000 });
  }
}
