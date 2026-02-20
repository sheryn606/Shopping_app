import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.api.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: CartItem) {
    const newQuantity = item.quantity + 1;
    this.api.updateCartItemQuantity(item.id, newQuantity).subscribe({
      next: () => {
        this.snackBar.open('Quantity updated', 'Close', { duration: 1500 });
      }
    });
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.api.updateCartItemQuantity(item.id, newQuantity).subscribe({
        next: () => {
          this.snackBar.open('Quantity updated', 'Close', { duration: 1500 });
        }
      });
    }
  }

  removeItem(item: CartItem) {
    this.api.removeCartItem(item.id).subscribe({
      next: () => {
        this.snackBar.open('Item removed from cart', 'Close', { 
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }
}
