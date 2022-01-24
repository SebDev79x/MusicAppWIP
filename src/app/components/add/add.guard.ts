import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AddGuard implements CanActivate {
  public isUserLoggedIn!: boolean;

  constructor(private _router: Router, private _auth: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._auth.authenticatedUser.subscribe(value => {
        this.isUserLoggedIn = value;
        console.log('value islogged', value);

      });
      if (this.isUserLoggedIn == null || false) {

        this._router.navigate(['/page-not-found']);
        return false;
      }
    return true;
  }

}
