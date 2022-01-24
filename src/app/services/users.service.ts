import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Users } from '../users';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:HttpClient ) {
    type ValidationErrors = {
      [key: string]: any;
  };
   }
  createUser(user:Users):Observable<Users>{
    return this._http.post<Users>('http://localhost/SuperApp/addUser.php', user)
  }
  getUsersNamesList():Observable<Users[]>{
    return this._http.get<Users[]>('http://localhost/SuperApp/usersNamesList.php')
  }
  getUsers():Observable<Users[]>{
    return this._http.get<Users[]>('http://localhost/SuperApp/usersList.php')
  }

/*   usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getUsersNamesList(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  } */
  /* usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getUsersNamesList(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  } */
  /* updateInfosUser(user:FormData){
    return this._http.put<Users>('http://localhost/SuperApp/adduser.php', user)

  } */
  /**
   *
   * @param userId
   * @returns Id du membre, revoir Observable
   */
   getUserById(userId: number):Observable<Users[]> {
    return this._http.get<Users[]>('http://localhost/SuperApp/getUserById.php?userId=' + userId);


}

}
