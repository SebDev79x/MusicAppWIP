import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Routes, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/users';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  public isUserLoggedIn!: boolean;
  public usersList: Users[] = [];
  public user: Users = <Users>{};
  public route!: Router;
  public isThisUserExists!: boolean;
  constructor(private _router: Router, private _auth: AuthService, private _routes: ActivatedRoute, private _users: UsersService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._auth.authenticatedUser.subscribe((data: any) => {
      this.isUserLoggedIn = data
    });
    const id = +next.url[1].path;

    this._users.getUsers().subscribe((data: any) => {
      this.usersList = data
      this.isThisUserExists = this.usersList.some(item => item.userId == id)
      if (this.isThisUserExists == false) {
        this._router.navigate(['/page-not-found']);
      }
    })
    if (isNaN(id) || id <= 0 || this.isUserLoggedIn == false) {
      this._router.navigate(['/page-not-found']);
      return false;
    }
    return true;
  }
}
