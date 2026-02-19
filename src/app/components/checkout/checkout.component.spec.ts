import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { ApiService } from '../../services/api.service';
import { CartItem } from '../../models/cart.model';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {

    // Create spy for ApiService
    apiSpy = jasmine.createSpyObj('ApiService', ['getCart']);

    // Mock cart data
    apiSpy.getCart.and.returnValue([
      { name: 'Product A', price: 100, quantity: 2 },
      { name: 'Product B', price: 50, quantity: 1 }
    ] as CartItem[]);

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent], // standalone component
      providers: [
        { provide: ApiService, useValue: apiSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Component should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: cartItems should come from ApiService
  it('should get cart items from ApiService', () => {
    const items = component.cartItems;
    expect(apiSpy.getCart).toHaveBeenCalled();
    expect(items.length).toBe(2);
  });

  // ✅ Test 3: getTotal should calculate correctly
  it('should calculate total correctly', () => {
    const total = component.getTotal();
    expect(total).toBe(250);
  });

});
