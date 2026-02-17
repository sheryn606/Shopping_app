import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  productsData = [
    {
      id: '101',
      name: 'Polka-dots T-shirt',
      price: 400,
      category: 'boys',
      age: 4,
      img: 'https://m.media-amazon.com/images/I/71Qh00i90lL.jpg'
    },
    {
      id: '102',
      name: 'Lace dress',
      price: 1000,
      category: 'girls',
      age: 5,
      img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP0cYeMRjHXajF2UuLTX2AvDgVyg1bfDaajWnKURA9Iy0PYw_1d9JuPqT2x2Zckg_acJmCsdhDBOSn4CmX2nCXZYwExk4qygDjSy5y7iWSEMq-jV25j2YzSQ'
    },
    {
      id: '103',
      name: 'Jeans skirt',
      price: 800,
      category: 'girls',
      age: 3,
      img: 'https://m.media-amazon.com/images/I/91ppMchHU+L.jpg'
    },
    {
      id: '104',
      name: 'Cars T-shirt',
      price: 400,
      category: 'boys',
      age: 3,
      img: 'data:image/jpeg;base64,/9j/...'
    },
    {
      id: '105',
      name: 'Socks',
      price: 100,
      category: 'both',
      age: 2,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUBVOvwJbf7-czI1UlmfeJiYnAiKaUoIbISQ&s'
    }
  ];

  addToCart(product: any) {
    alert(product.name + ' added to cart!');
  }

}
