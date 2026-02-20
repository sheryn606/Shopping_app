import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
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
    private snackBar: MatSnackBar
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

    this.api.createOrder(this.getTotal(), orderItems).subscribe({
      next: (response) => {
        this.snackBar.open('Order placed successfully! Order ID: ' + response.orderId, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.snackBar.open('Error placing order', 'Close', { duration: 3000 });
      }
    });
  }
}
