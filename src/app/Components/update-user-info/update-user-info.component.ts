import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateInfoService } from 'src/app/Shared/Services/update-info.service';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css'],
})
export class UpdateUserInfoComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _UpdateInfoService: UpdateInfoService
  ) {}
  Err_msg: string = '';
  loadingSpinner: boolean = false;
  UpdateInfoForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });
  UpdateInfo(): void {
    if (this.UpdateInfoForm.valid) {
      this.loadingSpinner = true;
      let Info: object = this.UpdateInfoForm.value;
      this._UpdateInfoService.UpdateInfo(Info).subscribe({
        next: (response) => {
          console.log(response);
          this.loadingSpinner = false;
          this.Err_msg = '';
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.loadingSpinner = false;
          this.Err_msg = err.error.errors.msg;
        },
      });
    } else {
      this.UpdateInfoForm.markAllAsTouched();
    }
  }
}
