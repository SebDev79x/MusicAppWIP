import { AuthService } from '../services/auth.service';
import { DataHeaderService } from '../services/data-header.service';
import { Users } from '../users';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink, NavigationStart, Event } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { MatSlideToggle, MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlideButtonService } from '../services/slide-button.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myEntireNavbar') myEntireNavbar!: ElementRef;
  @ViewChild('slide') matSlideToggle!: MatSlideToggle;
  public qualityIsAdmin!: string | null;
  public isUserLoggedIn!: boolean;
  public userName!: string | null;
  public route!: any;
  public currentUrl!: any;
  public isChecked!: boolean;
  public userId: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('id')!));
  constructor(private _slideButt: SlideButtonService, private _auth: AuthService, private _dataHeader: DataHeaderService, private _router: Router, private _renderer: Renderer2, private _routes: ActivatedRoute) {


  }

  ngOnInit(): void {

    // On souscrit à l'observable qualityUser permettant de restituer la qualité de l'utilisateur (admin, simpleUser ou null)
    this._auth.qualityUser.subscribe(value => {
      this.qualityIsAdmin = value;
    });

    // On souscrit à l'observable authenticatedUser permettant de restituer le booléen this.isUserLoggedIn = connecté ou non
    this._auth.authenticatedUser.subscribe(value => {
      this.isUserLoggedIn = value;
    });

    // On souscrit à l'observable currentUserName permettant de restituer le pseudo de l'utilisateur
    this._auth.currentUserName.subscribe(value => {
      this.userName = value;
    });

    // On souscrit à l'observable userId permettant de restituer l'ID' de l'utilisateur
    this._auth.userId.subscribe((value: any) => {
      this.userId = value;
    });

    // On souscrit à l'observable slideToggleStateAsObservable permettant de restituer l'état du bouton SLIDE
    this._slideButt.slideToggleStateAsObservable.subscribe((data) => {
      this.isChecked = data
    })
  }
// Méthode comprenant déconnexion, navigation vers Home, button slide à false et behaviorsubject à false
  logOut() {
    this._auth.logOutUser();
    this._router.navigate(['home']);
    this.isChecked = false
    this._slideButt.shareToggleButtonState(this.isChecked)
  }
// Méthode qui renvoie vers le formulaire de connexion
  logIn() {
    this._router.navigate(['connection']);
  }
// En fonction de l'état du bouton, on renvoie vers formulaire de connexion ou bien déconnexion
  change(event: MatSlideToggleChange) {

    if (event.checked) {
/*       this.matSlideToggle.checked = this.isChecked
 */      this.logIn()
    } else {
      this.logOut()
    }

  }
// Méthodes retournant l'URL courante, si ça matche, on masque l'onglet correspondant

  isAddRoute() {
    return this._router.url.includes("/add");
  }
  isViewRoute() {
    return this._router.url.includes("/view");
  }
  isUsersListRoute() {
    return this._router.url.includes("/usersList");
  }
  isRegistrationRoute() {
    return this._router.url.includes("/registration");
  }
  isBandViewRoute() {
    return this._router.url.includes("/view-band");
  }
  isConnectionRoute() {
    return this._router.url.includes("/connection");
  }
  isMyProfileRoute() {
    return this._router.url.includes("/profile/" + this.userId);
  }
}
