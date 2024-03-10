import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) {}
  GetAllCategories(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }
  GetSpecificCategories(CategoryId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${CategoryId}`
    );
  }
  GetAllSubCategories(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/subcategories`
    );
  }
  GetSpecificSubCategories(SubCategoryId: string): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/subcategories/${SubCategoryId}`
    );
  }
  GetAllSubCategoriesOnCategory(CategoryId: string) {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/categories/${CategoryId}/subcategories`
    );
  }
}
