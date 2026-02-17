import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]  // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Products array should not be empty
  it('should have products', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  // ✅ Test 3: addToCart should call alert
  it('should call alert when addToCart is called', () => {
    spyOn(window, 'alert');

    const product = {
      name: 'Test Product',
      price: 1000,
      image: ''
    };

    component.addToCart(product);

    expect(window.alert).toHaveBeenCalledWith('Test Product added to cart!');
  });

});
