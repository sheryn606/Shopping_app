import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
<<<<<<< HEAD

  // Default Route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Main Pages
  { path: 'home', component: HomeComponent, title: 'Cuddlecot - Home' },
  { path: 'products', component: ProductsComponent, title: 'Cuddlecot - Products' },
  { path: 'cart', component: CartComponent, title: 'Cuddlecot - Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Cuddlecot - Checkout' },
  { path: 'about', component: AboutComponent, title: 'Cuddlecot - About Us' },

  // Wildcard Route (404 handling)
  { path: '**', redirectTo: 'home' }
=======
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component: HomeComponent
    },
    {path:'products',component: ProductsComponent
    },
    {path:'cart',component: CartComponent
    },
    {path:'checkout',component: CheckoutComponent
    },
    {path:'about',component: AboutComponent
    },
    {path:'login',component:LoginComponent},
    {path:'**',redirectTo:'home'}
    
>>>>>>> 8921dd8ae12977e8b3bcd295cc47ca3b35ff7826

];
