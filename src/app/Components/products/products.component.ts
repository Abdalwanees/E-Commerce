import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categories } from 'src/app/Shared/Interfaces/categories';
import { Product } from 'src/app/Shared/Interfaces/product';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { HomeDataService } from 'src/app/Shared/Services/home-data.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _HomeDataService: HomeDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}

  AllProducts: Product[] = [];
  AllCategories: Categories[] = [];
  searchterm: string = '';
  CartItemNum: Number = 0;
  WishList: string[] = [];
  ngOnInit(): void {
    // Get All Products
    this._HomeDataService.GetAllProducts().subscribe({
      next: (response) => {
        // console.log(response);

        this.AllProducts = response.data;
        // console.log(this.AllProducts);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    //getnumCartItem
    this._CartService.getCartDetails().subscribe({
      next: (response) => {
        // console.log(response);
        this.CartItemNum = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //getWishList Array
    this._WishListService.getAllFevProduct().subscribe({
      next: (response) => {
        console.log(response);
        this._WishListService.WishNum.next(response.count);
        console.log(response.count);
        console.log(this._WishListService.WishNum);

        const NewData = response.data.map((item: any) => item._id);
        // console.log(NewData);
        this.WishList = NewData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProduct(productId: string, btnElement: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnElement, 'disabled', 'true');
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        // console.log(response);

        this._ToastrService.success(response.message);
        this.CartItemNum = response.numOfCartItems;
        this._Renderer2.removeAttribute(btnElement, 'disabled');
      },

      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnElement, 'disabled');
      },
    });
  }
  addFevProduce(productId: string): void {
    this._WishListService.addFevProduct(productId).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message);
        this.WishList = response.data;
        // console.log(this.WishList);
        this._WishListService.WishNum.next(this.WishList.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeFevProduce(ProductId: string): void {
    this._WishListService.removeFevProduct(ProductId).subscribe({
      next: (response) => {
        // console.log(response);
        // this._WishListService.WishNum.next(response.count);
        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );
        this.WishList = response.data;
        // console.log(this.WishList.length);
        this._WishListService.WishNum.next(this.WishList.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
