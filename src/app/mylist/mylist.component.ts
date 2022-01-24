import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BandsFromDBService } from '../services/bands-from-db.service';
import { UsersService } from '../services/users.service';
import { Users } from '../users';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  public myCheckedList!: any;
  public yesArray!: any;

  public isUserLoggedIn!: boolean;
  public user: Users = <Users>{};
  public userId!: number;
  public isMyProfile: boolean = false


  constructor(private _auth: AuthService, private _router: Router, private _users: UsersService, private _routes: ActivatedRoute, private _bandsFromDBService: BandsFromDBService) { }

  ngOnInit(): void {


    this._bandsFromDBService.bandsList$.subscribe((data) => {
      this.myCheckedList = data
/*         localStorage.setItem('chosenBandsList',JSON.stringify(this.myCheckedList))
 */

    })
    this.userId = JSON.parse(localStorage.getItem('id')!);
/*     console.log('this.userId mylist', this.userId);
 */    const id = +this._routes.snapshot.paramMap.get('userId')!;
    this._users.getUsers().subscribe((user: Users[]) => {
      this.user = user.find(user => user.userId == id)!
      if (id == this.userId) {
        this.isMyProfile = true
      }
    })
  }

}
