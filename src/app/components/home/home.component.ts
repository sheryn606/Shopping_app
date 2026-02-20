import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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
export class HomeComponent {

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
