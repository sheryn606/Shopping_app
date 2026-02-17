import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products = [
    {
      name: 'Laptop',
      price: 50000,
      image: 'https://via.placeholder.com/200'
    },
    {
      name: 'Mobile',
      price: 20000,
      image: 'https://via.placeholder.com/200'
    },
    {
      name: 'Headphones',
      price: 2000,
      image: 'https://via.placeholder.com/200'
    }
  ];

  addToCart(product: any): void {
    alert(product.name + ' added to cart!');
  }

}
