import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  UserData: any;
  DecodeUserData() {
    if (localStorage.getItem('E_Token') != null) {
      let token: any = localStorage.getItem('E_Token');
      let DecodeToken = jwtDecode(token);
      this.UserData = DecodeToken;
    }
  }
  SetRegister(UserData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      UserData
    );
  }
  SetLogIn(UserData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      UserData
    );
  }
  LogOut(): void {
    localStorage.removeItem('E_Token');
    this._Router.navigate(['/login']);
  }
}
