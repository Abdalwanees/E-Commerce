import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './Shared/Guards/auth.guard';
import { DetailsComponent } from './Components/details/details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { UpdatePassComponent } from './Components/update-pass/update-pass.component';
import { UpdateUserInfoComponent } from './Components/update-user-info/update-user-info.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';

const routes: Routes = [
  // Blank layout
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Product Details',
      },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'wishlist', component: WishListComponent, title: 'Wish List' },
      {
        path: 'UpdatePass',
        component: UpdatePassComponent,
        title: 'Update Password',
      },
      {
        path: 'UpdateUserInfo',
        component: UpdateUserInfoComponent,
        title: 'Update User Info',
      },
      { path: 'allorders', redirectTo: 'home', pathMatch: 'full' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' },
    ],
  },
  // auth layout
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LogInComponent, title: 'LogIN' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
