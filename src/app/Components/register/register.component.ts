import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
//input -->formcontrol
//input -->formgroup
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  err_msg: string = '';
  Isloading: boolean = false;
  ConfirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({
        missmatch: true,
      });
    }
  }
  RegisterForme: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.ConfirmPassword] } as FormControlOptions
  );
  HandleForme(): void {
    if (this.RegisterForme.valid) {
      this.Isloading = true;
      this._AuthService.SetRegister(this.RegisterForme.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.Isloading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.Isloading = false;
          this.err_msg = err.error.message;
        },
      });
    } else {
      this.RegisterForme.markAllAsTouched();
    }
  }
}
