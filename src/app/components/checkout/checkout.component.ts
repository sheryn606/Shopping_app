import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { CartItem } from '../../models/cart.model';
import { Bill, BillItem } from '../../models/bill.model';
import { BillComponent } from '../bill/bill.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl:'./checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price', 'subtotal'];

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.api.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Your cart is empty', 'Close', { duration: 3000 });
      return;
    }

    const orderItems = this.cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));
const total = this.getTotal();

    this.api.createOrder(total, orderItems).subscribe({
      next: (response) => {
        // Generate bill after order is placed
        this.generateBill(response.orderId, total);
      },
      error: (error) => {
        this.snackBar.open('Error placing order', 'Close', { duration: 3000 });
      }
    });
  }

  generateBill(orderId: number, totalAmount: number) {
    const subtotal = totalAmount / 1.18; // Reverse calculate subtotal (removing 18% tax)
    const tax = totalAmount - subtotal;

    const billItems: BillItem[] = this.cartItems.map(item => ({
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    }));

    const billData: Bill = {
      orderId: orderId,
      userId: this.api.getCurrentUserId(),
      customerName: this.api.getCurrentUserName(),
      items: billItems,
      subtotal: subtotal,
      tax: tax,
      total: totalAmount,
      paymentStatus: 'Paid',
      createdAt: new Date()
    };

    // Save bill to database
    this.api.createBill(billData).subscribe({
      next: (response) => {
        // Show bill preview in modal
        this.showBillPreview({ ...billData, id: response.billId });
        
        this.snackBar.open('Order placed successfully! Order ID: ' + orderId, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Error creating bill:', error);
        // Still navigate even if bill creation fails
        this.router.navigate(['/home']);
      }
    });
  }

  showBillPreview(bill: Bill) {
    const dialogRef = this.dialog.open(BillComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: bill,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
