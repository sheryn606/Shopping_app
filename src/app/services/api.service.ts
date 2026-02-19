import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Mock Products (temporary until backend is ready)
  private products: Product[] = [
    {
      id: 1,
      name: 'Soft Cotton Dress',
      price: 999,
      image: 'assets/sample.jpg',
      category: 'Girls',
      description: 'Comfortable cotton dress for kids',
      age:3
    },
    {
      id: 2,
      name: 'Baby Hoodie',
      price: 799,
      image: 'assets/sample.jpg',
      category: 'Boys',
      description: 'Warm and cozy hoodie',
age:5
    }
  ];

  private cart: CartItem[] = [];

  getProducts(): Product[] {
    return this.products;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

 addToCart(product: Product): void {
  const existing = this.cart.find(p => p.productId === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    this.cart.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      
    });
  }
}


  removeCartItem(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }
}
