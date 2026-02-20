import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  features = [
    { icon: 'verified', title: 'Quality Assured', desc: 'Premium fabrics tested for comfort' },
    { icon: 'local_shipping', title: 'Free Shipping', desc: 'On all orders nationwide' },
    { icon: 'support_agent', title: '24/7 Support', desc: 'Always here to help you' },
    { icon: 'workspace_premium', title: 'Certified Safe', desc: 'Hypoallergenic materials' }
  ];

}
