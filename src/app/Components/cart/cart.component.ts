import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartDetails } from 'src/app/Shared/Interfaces/cart-details';
// import { CartDetails } from 'src/app/Shared/Interfaces/cart-details';

import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  cartdetails: any = {};
  delete_loading: boolean = false;
  ClearCArt_loading: boolean = false;
  item_id: string = '';
  backhome() {
    this._Router.navigate(['/home']);
  }
  productlength: number = 0;
  cartId: string = '';

  ngOnInit(): void {
    this._CartService.getCartDetails().subscribe({
      next: (response) => {
        // console.log(response.data.products.count);
        this.cartdetails = response.data;
        this.cartId = this.cartdetails._id;
        console.log(this.cartId);

        this.productlength = this.cartdetails.products.length;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  deleteProduct(productID: string) {
    this.item_id = productID;
    this.delete_loading = true;
    this._CartService.removeProduct(productID).subscribe({
      next: (response) => {
        this.delete_loading = false;
        console.log(response);
        this.cartdetails = response.data;
        this.productlength = this.cartdetails.products.length;
        this._ToastrService.success('Product deleted successfuly');
      },
      error: (err) => {
        this.delete_loading = false;
        console.log(err);
      },
    });
  }
  updateCartQuantity(productId: string, count: number): void {
    if (count > 0) {
      this._CartService.updateCartQuantity(productId, count).subscribe({
        next: (response) => {
          console.log(response);
          this.cartdetails = response.data;
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
  clearCart(): void {
    this.ClearCArt_loading = true;
    this._CartService.clearCart().subscribe({
      next: (response) => {
        this.ClearCArt_loading = false;
        this._Router.navigate(['/home']);
        console.log(response);
        this._ToastrService.success('Cart deleted successfuly');
      },
      error: (err) => {
        this.ClearCArt_loading = false;

        console.log(err);
      },
    });
  }
}
