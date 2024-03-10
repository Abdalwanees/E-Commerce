import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/Shared/Services/forget-pass.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private _ForgetPassService: ForgetPassService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  loadingSpinner: boolean = false;
  userErr_msg: string = '';
  userSuccess_msg: string = '';
  email: string = '';
  ForgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  ResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });
  ResetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  forgetPassword() {
    let userEmail = this.ForgetForm.value;
    this.email = userEmail.email;
    this.loadingSpinner = true;
    this._ForgetPassService.forgetPasswod(userEmail).subscribe({
      next: (response) => {
        // console.log(response);
        this.loadingSpinner = false;
        this.userSuccess_msg = response.message;
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
        this.userErr_msg = '';
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadingSpinner = false;
        this.userErr_msg = err.error.message;
      },
    });
  }
  BackStep1() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.userSuccess_msg = '';
  }
  resetCode() {
    let resetCode: string = this.ResetCodeForm.value;
    this.loadingSpinner = true;
    this._ForgetPassService.ResetCode(resetCode).subscribe({
      next: (response) => {
        // console.log(response);
        this.loadingSpinner = false;
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.userErr_msg = '';
        this.userSuccess_msg = '';
      },
      error: (err) => {
        console.log(err);
        this.loadingSpinner = false;
        this.userErr_msg = err.error.message;
        this.userSuccess_msg = '';
      },
    });
  }
  newPassword() {
    let resetPass = this.ResetPasswordForm.value;
    resetPass.email = this.email;
    this.loadingSpinner = true;
    this._ForgetPassService.newPassword(resetPass).subscribe({
      next: (response) => {
        this.loadingSpinner = false;
        // console.log(response);
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.userErr_msg = '';
        this.userSuccess_msg = '';
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.loadingSpinner = false;
      },
    });
  }
}
