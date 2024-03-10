import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateInfoService } from 'src/app/Shared/Services/update-info.service';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css'],
})
export class UpdatePassComponent {
  constructor(
    private _UpdateInfoService: UpdateInfoService,
    private _Router: Router
  ) {}
  loadingSpinner: boolean = false;
  Err_msg: string = '';
  Sucess_msg: string = '';

  UpdatePassForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: [this.ConfirmPassword] } as FormControlOptions
  );
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
  UpdatePass(): void {
    if (this.UpdatePassForm.valid) {
      let data: object = this.UpdatePassForm.value;
      this.loadingSpinner = true;
      this._UpdateInfoService.Updatepass(data).subscribe({
        next: (response) => {
          console.log(response);
          this.Err_msg = '';
          this.Sucess_msg = response.message;
          this.loadingSpinner = false;
          this._Router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          console.log(err.error.message);
          this.loadingSpinner = false;
          this.Err_msg = err.error.message;
          this.Sucess_msg = '';
        },
      });
    } else {
      this.UpdatePassForm.markAllAsTouched();
    }
  }
}
