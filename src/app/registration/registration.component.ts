import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Users } from '../users';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public takenUsernames!: any;
  public theNameTypedByUser!: any;
  public theEmailTypedByUser!: any;

  public isUserNameAlreadyExistsInThisList!: boolean;
  public user: Users = <Users>{};
  public _userId!: number;
  public registrationOk: boolean = false;
  public addUser!: FormGroup;
  public isUserLoggedIn = false;
  public usersList: Users[] = [];
  public message1!: string;
  public message2!: string;
  public userName!: AbstractControl;
  public email!: AbstractControl;

  constructor(private _fb: FormBuilder,
    private _router: Router, private _usersService: UsersService, private _routes: ActivatedRoute) {
    this.buildForm();


  }

  ngOnInit(): void {


  }
  //  Pour gérer les erreurs avec ngIf

  get userPassword() { return this.addUser.get('userPassword'); }
  /*   get email() { return this.addUser.get('email'); }  */

  private buildForm() {
    this.addUser = this._fb.group({
      'userId': [],
      'userName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      'userPassword': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      'email': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35),Validators.email])
    })
    // à passer en paramètre de la fonction verifyIfLoginUserAlreadyExists dans le template
    this.userName = this.addUser.controls['userName'];
    this.email = this.addUser.controls['email'];
  }

  verifyIfLoginUserAlreadyExists(userNameTypedByUser: AbstractControl) {
    this._usersService.getUsersNamesList().subscribe((data: Users[]) => {
      const doesUsernameExist = data.some(({ userName }: Users) => userName === userNameTypedByUser.value);
      console.log('doesUsernameExist', doesUsernameExist);
      if (doesUsernameExist) {
        this.message1 = 'Pseudo indisponible !'
      } else {
        this.message1 = ''
      }

    })
  }

  verifyIfEmailUserAlreadyExists(emailTypedByUser: AbstractControl) {
    this._usersService.getUsersNamesList().subscribe((data: Users[]) => {
      const doesEmailExist = data.some(({ email }: Users) => email === emailTypedByUser.value);
      console.log('doesEmailExist', doesEmailExist);
      if (doesEmailExist) {
        this.message2 = 'Cet email existe déjà !'
      } else {
        this.message2 = ''
      }

    })
  }
  /*
     if (this.addUser.value.userName == criteria) {
       this.message = "NOOOOOOOON il existe déjà"
       return false

     } else {
       this.message = "Ouii !!!! ahahahahhaha"

       return true
     } */

  /**
   * Fonction GOOD, METTRE quality en com
   */
  /*   verifyIfLoginUserAlreadyExists(theNameTypedByUser: any): any {
      theNameTypedByUser = theNameTypedByUser.toLocaleLowerCase();
      this._usersService.getUsers().subscribe((data: Users[]) => {
        this.usersList = data}) */
  /*  let result =  this.usersList.filter((data: Users) => {
        data.userName = theNameTypedByUser
       console.log('theNameTypedByUser', typeof(theNameTypedByUser));
       console.log('data', typeof(data.userName));


     })
   }
     console.log('result',result); */


  /* let usersNamesList = this.usersList.filter((data) => {
    data.userName

  })
  console.log('this.usersNamesList', usersNamesList);
  console.log('typeofthis.usersNamesList', typeof (usersNamesList)); */
  /*
       var num = this.usersList.findIndex(
        criteria => { criteria !== data[userName] } );
        return console.log('num',num); */
  /*   console.log('criteria',criteria);
console.log('this.usersList',this.usersList);
  console.log('this.usersList',typeof(this.usersList));

const isUserNameAlreadyExistsInThisList = this.usersList.indexOf(criteria) !== -1
console.log('oui ou non',isUserNameAlreadyExistsInThisList); */
  /*    console.log('this.usersList.includes(criteria)', this.usersList.includes(criteria)

     ); */



  /* const isUserNameAlreadyExistsInThisList = this.usersNamesList.includes(criteria)
  console.log('oui ou non',isUserNameAlreadyExistsInThisList);

  if(isUserNameAlreadyExistsInThisList == true){
  this.message = "oui hélas il existe"
  return false
  }else{
    this.message = "non"
  return true
  } */
  /*   usernameValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this._usersService.getUsersNamesList(control.value).pipe(
          map(res => {
            // if res is true, username exists, return true
            return res ? { usernameExists: true } : null;
            // NB: Return null if there is no error
          })
        );
      };
    } */



  /* checkIfUsernameExists(nametypedByUser: any): Observable < boolean > {
    this._usersService.getUsersNamesList(((nametypedByUser))).subscribe((element: any) => {
      this.takenUsernames = element

    });
    console.log('this.takenUsernames',this.takenUsernames);

    return of(this.takenUsernames.includes(nametypedByUser));

  } */

  registerUser(event: Event) {

    event.preventDefault();
    if ((this.message1.length || this.message2.length) > 0) {
      return
    }
    if (this.addUser.valid) {

      var dataForm = new FormData();
      dataForm.append('userName', this.addUser.value.userName);
      dataForm.append('userPassword', this.addUser.value.userPassword);
      dataForm.append('email', this.addUser.value.email);

      this._usersService.createUser(this.addUser.value).subscribe((data) => {
        console.log('data', data);
        this.registrationOk = true;
        console.log('youpi');
        console.log('this.addUser.value', this.addUser.value);

        console.log('this.addUser.value.email', this.addUser.value.email);
        console.log('this.addUser.value.userName', this.addUser.value.userName);
        console.log('this.addUser.value.userPassword', this.addUser.value.userPassword);
        this._router.navigate(['connection'])
      })
    }

  }




}
