import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  /*
  // MsgError: string = '';
  // IsLoadig: boolean = false;
  // constructor(private _AuthService: AuthService, private _Router: Router) {}
  // LogInForme: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
  //   ]),
  // });
  // handelForm() {
  //   if (this.LogInForme.valid) {
  //     this.IsLoadig = true;
  //     this._AuthService.SetLogIn(this.LogInForme.value).subscribe({
  //       next: (response) => {
  //         // console.log(response);
  //         if (response.message == 'success') {
  //           this.IsLoadig = false;
  //           this._Router.navigate(['/home']);
  //         }
  //       },
  //       error: (err) => {
  //         // console.log(err);
  //         this.IsLoadig = false;
  //         this.MsgError = err.error.message;
  //       },
  //     });
  //   }
  // }
  */
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  Err_msg: string = '';
  IsLoading: boolean = false;
  LogInForme: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });
  // LogInForme: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  // Validators.required,
  // Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
  //   ]),
  // });
  LogIn(): void {
    if (this.LogInForme.valid) {
      this.IsLoading = true;
      this._AuthService.SetLogIn(this.LogInForme.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.IsLoading = false;
            localStorage.setItem('E_Token', response.token);
            this._AuthService.DecodeUserData();
            // console.log(this._AuthService.UserData);
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.IsLoading = false;
          this.Err_msg = err.error.message;
        },
      });
    } else {
      this.LogInForme.markAllAsTouched();
    }
  }
}
