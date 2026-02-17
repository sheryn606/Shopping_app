import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test Initial Cart Items
  it('should have cart items', () => {
    expect(component.cartItems.length).toBeGreaterThan(0);
  });

  // ✅ Test Increase Quantity
  it('should increase quantity', () => {
    const item = component.cartItems[0];
    const initialQty = item.quantity;

    component.increaseQuantity(item);
    expect(item.quantity).toBe(initialQty + 1);
  });

  // ✅ Test Decrease Quantity
  it('should decrease quantity', () => {
    const item = component.cartItems[0];
    item.quantity = 2;

    component.decreaseQuantity(item);
    expect(item.quantity).toBe(1);
  });

  // ✅ Test Total Calculation
  it('should calculate total correctly', () => {
    const total = component.getTotal();
    expect(total).toBeGreater
