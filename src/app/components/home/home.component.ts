import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Wait for Bootstrap to load
      setTimeout(() => {
        const carouselElement = document.querySelector('#productCarousel');
        if (carouselElement) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            const carousel = new bootstrap.Carousel(carouselElement, {
              interval: 3000,
              ride: 'carousel',
              wrap: true,
              keyboard: true,
              pause: 'hover'
            });
            console.log('Bootstrap carousel initialized successfully');
          } else {
            console.error('Bootstrap is not loaded');
          }
        }
      }, 100);
    }
  }

  features = [
    {
      icon: 'favorite',
      title: 'Premium Quality',
      description: 'Soft, comfortable fabrics for your little ones'
    },
    {
      icon: 'local_shipping',
      title: 'Free Shipping',
      description: 'Fast and free delivery on all orders'
    },
    {
      icon: 'verified_user',
      title: 'Safe & Secure',
      description: 'Hypoallergenic and skin-friendly materials'
    },
    {
      icon: 'star',
      title: 'Trusted Brand',
      description: 'Loved by thousands of happy parents'
    }
  ];

}
