import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BandsFromDBService } from 'src/app/services/bands-from-db.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: Users = <Users>{};
  public subscription!: any;
  public isUserLoggedIn!: boolean;

  constructor(private _auth: AuthService, private _router: Router, private _users: UsersService, private _routes: ActivatedRoute, private _bandsFromDBService: BandsFromDBService) { }

  ngOnInit(): void {
    // Permettre le rafraissement des données en pointant la même URL via l'onglet "mon compte"
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    const routeParams = this._routes.snapshot.params;

    this.isUserLoggedIn = JSON.parse(localStorage.getItem('loggedUser')!);
    const id = +this._routes.snapshot.paramMap.get('userId')!;
    this._users.getUsers().subscribe((user: Users[]) => {
      this.user = user.find(user => user.userId == id)!
    })

   /*  this. = */
  }

  // On se désabonne sinon augmentation quasi exponentielle des logs dans la console après chaque va-et-vient
/*   ngOnDestroy() {
    this.subscription.unsubscribe();
  } */
}
