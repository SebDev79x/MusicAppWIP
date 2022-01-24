import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataHeaderService } from '../services/data-header.service';
import { SlideButtonService } from '../services/slide-button.service';
import { UsersService } from '../services/users.service';
import { Users } from '../users';
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  public user: Users[] = [];
  public route!: any;
  public isUserLoggedIn!: boolean;
  public loggedUser!: string;
  public message!: string;
  public loginForm!: FormGroup;
  constructor(private _fb: FormBuilder,
    private _router: Router, private _usersService: UsersService, private _auth: AuthService, private _slideButt: SlideButtonService) {
    this.buildForm();

  }

  ngOnInit(): void {

  }

  buildForm() {
    this.loginForm = this._fb.group({
      'email': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.email]),
      'userPassword': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(65)]]
    })
  }
  /**
   * Pour gérer les erreurs avec ngIf
   */
  get email() { return this.loginForm.get('email'); }
  get userPassword() { return this.loginForm.get('userPassword'); }


  /*   detectUserLeavingPageWithoutBeingLogged() {
      this._router.events.subscribe(
        (event) => {
          if (event instanceof NavigationStart && this.isUserLoggedIn == null) {
            this.sendMessageToParentHeader = false
            this._slideButt.sendToggleButtonState(this.sendMessageToParentHeader)
          }

        });
    } */
  // VOIR POUR PHASE AVANT SUBMIT, SI ON CHANGE DE ROUTE, LE BOUTON doit revenir à false si pas loggé
  loginUser() {
    this._slideButt.shareToggleButtonState(false)


    if (this.loginForm.valid) {
      var dataForm = new FormData();
      dataForm.append('email', this.loginForm.value.email);
      dataForm.append('userPassword', this.loginForm.value.userPassword);
      const loginData = this.loginForm.value;
      //
      this._auth.logUser(loginData).subscribe((response: any) => {
        // Réponse du serveur
        if (response.status == true) {
          // Objet User : id, userName etc.
          this.loggedUser = response.data;
          // On enregistre localement les infos de l'objet User
          // boolean, true = loggé
          localStorage.setItem('loggedUser', JSON.stringify(response.status));
          const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!)
          // simpleUser ou admin
          localStorage.setItem('userQuality', JSON.stringify(response.data.quality));
          const userQuality = JSON.parse(localStorage.getItem('userQuality')!)

          // nom de l'user
          localStorage.setItem('userName', JSON.stringify(response.data.userName));
          const userName = JSON.parse(localStorage.getItem('userName')!)
          localStorage.setItem('id', JSON.stringify(response.data.userId));
          const id = JSON.parse(localStorage.getItem('id')!)
          console.log('id de l\'user', this._auth.userId.getValue());

          this.isUserLoggedIn = JSON.parse(localStorage.getItem('loggedUser')!);
          this._auth.userId.next(id);

          // Dans le service auth,
          this._auth.authenticatedUser.next(loggedUser);

          this._auth.qualityUser.next(userQuality);
          this._auth.currentUserName.next(userName);
          localStorage.setItem('toggleState', JSON.stringify(loggedUser));
          const toggleState = JSON.parse(localStorage.getItem('toggleState')!)
          this._slideButt.shareToggleButtonState(toggleState)
          let redirection = () => this._router.navigate(['usersList'])
          setTimeout((redirection), 1000);
          if (response.data.quality == 'simpleUser') {
            this.message = 'Vous allez être redirigé(e) vers la page des groupes'
          } else if (response.data.quality == 'admin') {
            this.message = 'Bienvenue Admin, RESTECP !';
          }
        } else {
          this.isUserLoggedIn = false
          console.log('Ici aucun utilisateur loggé');

          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = response.message
        }
      })
    } else {
      setTimeout(() => {
        this.message = ''
      }, 2000)
      this.message = 'Le formulaire semble vide...'
    }


  }
}

