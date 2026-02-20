import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './products.component.html',
  styleUrl:'./products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  selectedCategory: string = '';
  selectedAge: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  loading = false;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check for category query parameter
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
      }
    });
  }

  addToCart(product: Product) {
    this.api.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open(`${product.name} added to cart!`, 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Error adding to cart', 'Close', { duration: 3000 });
      }
    });
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

  clearFilters() {
    this.selectedCategory = '';
    this.selectedAge = null;
    this.minPrice = null;
    this.maxPrice = null;
  }
}
