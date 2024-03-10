import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css'],
})
export class NavbarBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}
  wishCount: number = 0;
  ngOnInit(): void {
    this._WishListService.WishNum.subscribe({
      next: (data) => {
        this.wishCount = data;
      },
    });
  }
  @ViewChild('navbar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onscroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }
  LogOutUser(): void {
    this._AuthService.LogOut();
  }
}
