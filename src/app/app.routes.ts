import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
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
    {path:'**',redirectTo:'home'}

];
