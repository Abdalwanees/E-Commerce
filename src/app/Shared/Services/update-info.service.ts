import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateInfoService {
  constructor(private _HttpClient: HttpClient) {}
  Updatepass(UpdatedData: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      UpdatedData
    );
  }
  UpdateInfo(UpdatedInfo: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe`,
      UpdatedInfo
    );
  }
}
