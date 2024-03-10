import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Shared/Interfaces/product';
import { HomeDataService } from 'src/app/Shared/Services/home-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _HomeDataService: HomeDataService,
    private _CartService: CartService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  WishList: string[] = [];

  DetailsCustomOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  Product_Details: Product = {} as Product;
  SliderImage: any[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        let IdProduct: any = parms.get('id');
        // console.log(parms);
        this._HomeDataService.GetSpecificData(IdProduct).subscribe({
          next: (Response) => {
            // console.log(Response.data);
            this.SliderImage = Response.data.images;
            // console.log(this.SliderImage);

            // console.log(Response.data);
            this.Product_Details = Response.data;
          },
        });

        console.log(IdProduct);
      },
    });
  }
  addProduct(productId: string): void {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        // console.log(response);
        this._Router.navigate(['/home']);
        this._ToastrService.success(response.message);
      },
      error: (err) => {
        console.log(err);
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
