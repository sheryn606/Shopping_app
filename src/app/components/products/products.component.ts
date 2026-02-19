import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl:'./products.component.css'

})
export class ProductsComponent {

  products: Product[] = [];
selectedCategory: string = '';
selectedAge: number | null = null;
minPrice: number | null = null;
maxPrice: number | null = null;

  constructor(private api: ApiService) {
    this.products = this.api.getProducts();
  }

  addToCart(product: Product) {
    this.api.addToCart(product);
    alert('Added to cart');
  }
  get filteredProducts(): Product[] {
  return this.products.filter(product => {

    const matchesCategory =
      !this.selectedCategory || product.category === this.selectedCategory;

    const matchesAge =
      !this.selectedAge || product.age === this.selectedAge;

    const matchesMinPrice =
      this.minPrice == null || product.price >= this.minPrice;

    const matchesMaxPrice =
      this.maxPrice == null || product.price <= this.maxPrice;

    return matchesCategory && matchesAge && matchesMinPrice && matchesMaxPrice;
  });
}

}
