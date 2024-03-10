import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DetailsComponent } from './Components/details/details.component';
import { NavbarBlankComponent } from './Components/navbar-blank/navbar-blank.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { NavbarAuthComponent } from './Components/navbar-auth/navbar-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermTextPipe } from './Pipes/term-text.pipe';
import { SearchPipe } from './Pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { MyhttpInterceptor } from './interceptores/myhttp.interceptor';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { UpdatePassComponent } from './Components/update-pass/update-pass.component';
import { UpdateUserInfoComponent } from './Components/update-user-info/update-user-info.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptores/loading.interceptor';
import { WishListComponent } from './Components/wish-list/wish-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LogInComponent,
    RegisterComponent,
    NotFoundComponent,
    DetailsComponent,
    NavbarBlankComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    NavbarAuthComponent,
    TermTextPipe,
    SearchPipe,
    CheckoutComponent,
    ForgetPasswordComponent,
    UpdatePassComponent,
    UpdateUserInfoComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
