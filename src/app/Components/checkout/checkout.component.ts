import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  cartID: any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params.get('id'));
        this.cartID = params.get('id');
      },
    });
  }

  checkout: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });
  handelforme(): void {
    // console.log(this.checkout.value);
    this._CartService.checkOut(this.cartID, this.checkout.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          this._ToastrService.success(response.status);
          window.open(response.session.url, '_self');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
