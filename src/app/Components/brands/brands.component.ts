import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Shared/Services/brands.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(
    private _BrandsService: BrandsService,
    private _WishListService: WishListService
  ) {}
  AllBrands: any[] = [];
  WishList: string[] = [];

  ngOnInit(): void {
    this._BrandsService.getAllPrands().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.AllBrands = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishListService.getAllFevProduct().subscribe({
      next: (response) => {
        // console.log(response);
        this._WishListService.WishNum.next(response.count);
        // console.log(response.count);
        // console.log(this._WishListService.WishNum);

        const NewData = response.data.map((item: any) => item._id);
        // console.log(NewData);
        this.WishList = NewData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  GetSpesificBrand(BrandId: string): void {
    this._BrandsService.getSpesificBrand(BrandId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
