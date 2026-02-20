import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private currentUserId = 1; // Default user (will be set after login)
  
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  // ==================== PRODUCTS ====================
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // ==================== AUTHENTICATION ====================
  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.user) {
          this.currentUserId = response.user.id;
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('userName', response.user.name);
          this.loadCart();
        }
      })
    );
  }

  getCurrentUserId(): number {
    const storedId = localStorage.getItem('userId');
    return storedId ? parseInt(storedId) : this.currentUserId;
  }

  getCurrentUserName(): string {
    return localStorage.getItem('userName') || 'Guest';
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.currentUserId = 1;
    this.cartSubject.next([]);
  }

  // ==================== CART ====================
  
  loadCart(): void {
    const userId = this.getCurrentUserId();
    this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`).subscribe(
      items => {
        const cartItems: CartItem[] = items.map(item => ({
          id: item.id,
          productId: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          quantity: item.quantity
        }));
        this.cartSubject.next(cartItems);
      }
    );
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product): Observable<any> {
    const userId = this.getCurrentUserId();
    return this.http.post<any>(`${this.apiUrl}/cart`, {
      userId: userId,
      productId: product.id,
      quantity: 1
    }).pipe(
      tap(() => this.loadCart())
    );
  }

  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart/${cartItemId}`, { quantity }).pipe(
      tap(() => this.loadCart())
    );
  }

  removeCartItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${id}`).pipe(
      tap(() => this.loadCart())
    );
  }

  // ==================== ORDERS ====================
  
  createOrder(totalAmount: number, items: any[]): Observable<any> {
    const userId = this.getCurrentUserId();
    return this.http.post<any>(`${this.apiUrl}/orders`, {
      userId,
      totalAmount,
      items
    }).pipe(
      tap(() => this.loadCart())
    );
  }

  getOrders(): Observable<any[]> {
    const userId = this.getCurrentUserId();
    return this.http.get<any[]>(`${this.apiUrl}/orders/${userId}`);
  }

  // ==================== BILLS ====================
  
  createBill(billData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bills`, billData);
  }

  getBillByOrderId(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bills/${orderId}`);
  }

  // ==================== EMPLOYEE ====================
  
  employeeLogin(employeeId: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/login`, { employeeId, password });
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders/all`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orders/${orderId}/status`, { status });
  }

  isEmployeeLoggedIn(): boolean {
    return !!localStorage.getItem('employeeId');
  }

  getEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }

  getEmployeeName(): string {
    return localStorage.getItem('employeeName') || 'Employee';
  }

  employeeLogout(): void {
    localStorage.removeItem('employeeId');
    localStorage.removeItem('employeeName');
  }
}
