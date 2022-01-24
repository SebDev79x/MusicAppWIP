import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataHeaderService {
  public qualityIsAdmin:any;
  public isUserLoggedIn:any;
  public userName:any;
/*   public authenticatedUser: BehaviorSubject<Users> = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('loggedUser')!));
  public qualityUser: BehaviorSubject<Users> = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('userQuality')!));
  public currentUserName: BehaviorSubject<Users> = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('userName')!));
 */
/*   public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 */  constructor(private _auth: AuthService) {

  }
  logOutUser() {
    this._auth.logOutUser();


  }

}
