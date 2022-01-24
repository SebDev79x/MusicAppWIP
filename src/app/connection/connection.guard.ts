import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SlideButtonService } from '../services/slide-button.service';
@Injectable({
  providedIn: 'root'
})
export class ConnectionGuard implements CanActivate {
  public isUserLoggedIn!: boolean;
  constructor(private _router: Router, private _auth: AuthService,private _slideButt: SlideButtonService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const connectionUrl = next.url[0].path;
    this._auth.authenticatedUser.subscribe(value => {
      this.isUserLoggedIn = value;

    });
    if (this.isUserLoggedIn == true) {
/*       this._slideButt.shareToggleButtonState(this.isUserLoggedIn )
 */
      this._router.navigate(['/page-not-found']);

      return false;
    }
    return true;
  }
}

