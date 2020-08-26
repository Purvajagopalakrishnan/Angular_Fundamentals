import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(activatedRouteNext: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +activatedRouteNext.url[1].path;
    if (isNaN(id) || id < 1) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
