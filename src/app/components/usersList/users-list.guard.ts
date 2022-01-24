import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsersListGuard implements CanActivate {
  public isUserLoggedIn!: boolean;
  public userName!: string | null;
  constructor(private _router: Router, private _auth: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  this._auth.authenticatedUser.subscribe(value => {
    this.isUserLoggedIn = value;

  });
    this._auth.currentUserName.subscribe((value)=>{
this.userName = value

    })
    if (this.isUserLoggedIn == null || false) {

      this._router.navigate(['/page-not-found']);
      return false;
    }
    return true;
  }
}
