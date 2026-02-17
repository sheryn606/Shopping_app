import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // Sample cart items (later replace with DB data)
  cartItems = [
    {
      id: 1,
      name: 'Soft Cotton Dress',
      price: 999,
      quantity: 1,
      image: 'assets/sample.jpg'
    }
  ];

  // Increase quantity
  increaseQuantity(item: any) {
    item.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Remove item
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  // Calculate total
  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

}
