import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {

    // Create spy object for ApiService
    apiSpy = jasmine.createSpyObj('ApiService', ['getProducts', 'addToCart']);

    // Mock getProducts to return sample data
    apiSpy.getProducts.and.returnValue([
      {
        id: 1,
        name: 'Test Product',
        price: 100,
        category: 'Test',
        age: 3,
        image: ''
      }
    ] as Product[]);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent], // standalone component
      providers: [
        { provide: ApiService, useValue: apiSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Component should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Should load products from service
  it('should load products from ApiService', () => {
    expect(component.products.length).toBeGreaterThan(0);
    expect(apiSpy.getProducts).toHaveBeenCalled();
  });

  // ✅ Test 3: Should call addToCart on ApiService
  it('should call api.addToCart when addToCart is triggered', () => {

    const product: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      category: 'Test',
      age: 3,
      image: '',
      description:'Test Text',
    };

    component.addToCart(product);

    expect(apiSpy.addToCart).toHaveBeenCalledWith(product);
  });

});
