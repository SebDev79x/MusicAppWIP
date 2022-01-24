
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Un objet de classe "BehaviorSubject" doit être initialisé avec une valeur par défaut,
  // car la principale caractéristique est de toujours devoir retourner une valeur aux observateurs.
  // Lors de la souscription, l'objet retourne la dernière valeur qu'il possède.
  // J'ai utilisé BehaviorSubject pour contourner le problème lié à LocalStorage et injecter dans d'autres composants
  // les valeurs affectées aux variables currentUserName etc.
  // que je ne pouvais récupérer dans mon composant 'header', ni parent ni enfant d'autres composants, ils sont frères
  public qualityUser: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  public qualityUser$ = this.qualityUser.asObservable()
  public authenticatedUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authenticatedUser$ = this.authenticatedUser.asObservable()
  public currentUserName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUserName$ = this.currentUserName.asObservable()
  public userId:BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  public userId$ = this.userId.asObservable()
  /*   public userName!: BehaviorSubject<Users | null>;
   */
  constructor(private _http: HttpClient, private _router: Router) {
    this.authenticatedUser.next(JSON.parse(localStorage.getItem('loggedUser')!))
    this.qualityUser.next(JSON.parse(localStorage.getItem('userQuality')!))
    this.currentUserName.next(JSON.parse(localStorage.getItem('userName')!))
    this.userId.next(JSON.parse(localStorage.getItem('id')!))
  }
  /**
   *
   * @param loginData
   * @returns
   */
  logUser(loginData: FormData): Observable<Users[]> {

    return this._http.post<Users[]>('http://localhost/SuperApp/connection.php', loginData, { responseType: 'json' })
  }
  /**
   *
   */
  logOutUser() {
    localStorage.clear()
    this.authenticatedUser.next(false);
    this.currentUserName.next(null)
    this.qualityUser.next(null)
    this.userId.next(null)
    this._router.navigate(['home'])
  }
}
/**
 *
 * import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../users';
import { DataHeaderService } from './data-header.service';
import { SlideButtonService } from './slide-button.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Un objet de classe "BehaviorSubject" doit être initialisé avec une valeur par défaut,
  // car la principale caractéristique est de toujours devoir retourner une valeur aux observateurs.
  // Lors de la souscription, l'objet retourne la dernière valeur qu'il possède.
  // J'ai utilisé BehaviorSubject pour contourner le problème lié à LocalStorage et injecter dans d'autres composants
  // les valeurs affectées aux variables currentUserName etc.
  // que je ne pouvais récupérer dans mon composant 'header', ni parent ni enfant d'autres composants, ils sont frères
  public userName!: BehaviorSubject<Users | null>;
  public authenticatedUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('loggedUser')!));
  public qualityUser: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(JSON.parse(localStorage.getItem('userQuality')!));
  public currentUserName: BehaviorSubject<Users | null> = new BehaviorSubject<Users | null>(JSON.parse(localStorage.getItem('userName')!));
  constructor(private _http: HttpClient, private _router: Router) {
  }

  logUser(loginData: FormData): Observable<Users[]> {

    return this._http.post<Users[]>('http://localhost/SuperApp/connection.php', loginData, { responseType: 'json' })
  }
remettre /**
  logOutUser() {
    localStorage.clear()
    this.authenticatedUser.next(false);
    this.currentUserName.next(null)
    this.qualityUser.next(null)
    this._router.navigate(['home'])
  }
}
 *
 *
 *
 */
