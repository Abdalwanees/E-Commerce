import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  // header: any = { token: localStorage.getItem('E_Token') };
  addToCart(ProductId: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: ProductId,
      }
      // {
      //   headers: this.header,
      // }
    );
  }
  getCartDetails(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/cart`
      // {
      //   headers: this.header,
      // }
    );
  }
  removeProduct(productid: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productid}`
      // { headers: this.header }
    );
  }
  updateCartQuantity(productid: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
      { count: count }
      // { headers: this.header }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
      // {
      //   headers: this.header,
      // }
    );
  }
  checkOut(CartId: string, UserData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`,
      { shippingAddress: UserData }
      // { headers: this.header }
    );
  }
}
