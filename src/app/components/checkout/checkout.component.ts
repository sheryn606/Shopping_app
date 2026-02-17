import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  cartItems = [
    { name: 'Product 1', price: 100, quantity: 2 },
    { name: 'Product 2', price: 50, quantity: 1 }
  ];

  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  paymentMethod: string = '';

  getTotal(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.price * item.quantity), 0);
  }

  placeOrder(): void {
    alert('Order placed successfully!');
  }
}
