import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Shared/Services/categories.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _CategoriesService: CategoriesService,
    private _WishListService: WishListService
  ) {}
  AllCategories: any[] = [];
  WishList: string[] = [];
  AllSubCategories: any[] = [];
  // CategoryId: string = '';
  ngOnInit(): void {
    this._CategoriesService.GetAllCategories().subscribe({
      next: (response) => {
        // console.log(response);
        this.AllCategories = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._CategoriesService.GetAllSubCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.AllSubCategories = response.data;
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
  GetSpacificCategory(CategoryId: string): void {
    console.log(CategoryId);

    this._CategoriesService.GetSpecificCategories(CategoryId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  GetSpacificSubCategory(CategoryId: string): void {
    console.log(CategoryId);

    this._CategoriesService.GetSpecificSubCategories(CategoryId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
