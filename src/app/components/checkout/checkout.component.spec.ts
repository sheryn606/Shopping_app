import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent]  // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: getTotal() should calculate total correctly
  it('should calculate total correctly', () => {
    component.cartItems = [
      { name: 'Product A', price: 100, quantity: 2 },
      { name: 'Product B', price: 50, quantity: 1 }
    ];

    const total = component.getTotal();
    expect(total).toBe(250);
  });

  // ✅ Test 3: placeOrder should trigger alert
  it('should call alert when placeOrder is called', () => {
    spyOn(window, 'alert');
    component.placeOrder();
    expect(window.alert).toHaveBeenCalledWith('Order placed successfully!');
  });

});
