import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../users';
import { AuthService } from '../../services/auth.service';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-users-list',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.scss']
})
export class UsersListComponent implements OnInit {
  public usersList: Users[] = [];
  public date!: any;
  private userId!: number;
  public qualityIsAdmin: any;
  public isUserLoggedIn: any;
  public userName: any;
  constructor(private _users: UsersService, private _router: Router, private _auth: AuthService) {
        this.isUserLoggedIn = JSON.parse(localStorage.getItem('loggedUser')!);
        this.qualityIsAdmin = JSON.parse(localStorage.getItem('userQuality')!);

  }

  ngOnInit(): void {

    this.date = new Date();
    /**
     * On récupère ici la liste des utilisateurs
     */
    this._users.getUsers().subscribe((data: Users[]) => {
      this.usersList = data
    })
    this._auth.qualityUser.subscribe(value => {
      this.qualityIsAdmin = value;
    });
    this._auth.authenticatedUser.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this._auth.currentUserName.subscribe(value => {
      this.userName = value;
    });
  }
  goToThisProfile(user: Users) {
    this.userId = user.userId;
    console.log('dans usersList',user.userId);

    this._router.navigate(['profile/' + this.userId])
  }
}
