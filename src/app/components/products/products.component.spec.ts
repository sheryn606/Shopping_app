import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent]  // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: productsData should not be empty
  it('should have product data', () => {
    expect(component.productsData.length).toBeGreaterThan(0);
  });

  // ✅ Test 3: addToCart should call alert
  it('should call alert when addToCart is called', () => {
    spyOn(window, 'alert');

    const product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      category: 'Test',
      age: '3+',
      img: ''
    };

    component.addToCart(product);

    expect(window.alert).toHaveBeenCalledWith('Test Product added to cart!');
  });

});
