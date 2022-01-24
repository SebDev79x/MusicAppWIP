import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BandsFromDBService } from '../../services/bands-from-db.service';
import { Bands } from '../../bands';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('subMessage') subMessage!: ElementRef;
  public parentMessage = "youpi";
  name = new FormControl('');
  addBand!: FormGroup;
  // RegEx imposant le choix entre fourchettes de dates
  // 1er bloc : [1][9][0-9][0-9] = années comprises entre 1900 et 1999, si l'on veut ajouter un groupe de Hard des années 20 :D
  // 1er chiffre : 1, 2ème : 9, 3ème : entre 0 et 9, 4ème : idem pour années 1900 et plus...
  // 2ème bloc : [2][0][0-1][0-9] = années 2000 à 2019
  // 1er chiffre : 2, 2ème : 0, 3ème : 0 ou 1, 4ème : entre 0 et 9
  // 3ème bloc : [2][0][2][0-1] = années 2020 à 2021
  public states: any;
  public states2: any;
  public isOpen = true;
  public yearValidationPattern = "^([1][9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0-1])$";
  public successMessage = false;
  public failureMessage = false;
  public victoryMessage = false;
  public redirectMessage = 'Vous allez être redirigé(e) dans quelques secondes :)';
  public newBand!: Bands;
  public multipleState: string = 'originalPosition';
  public multipleState2: string = 'finalPosition';
  public showComponentUploadImages!: any;
  public imageComponentIsDisplayed: boolean = false;
  public input!: any;
  public bandName!: AbstractControl
  public message1!: string;
  public message2!: string;

  constructor(private _fb: FormBuilder, private _bandsFromDBService: BandsFromDBService,
    private _router: Router, private _renderer2: Renderer2) {

    this.buildForm();
  }

  ngOnInit(): void {


  }
  /**
   * Getters
   */
  get bandId() { return this.addBand.get('bandId'); }
/*   get bandName() { return this.addBand.get('bandName'); }
 */  get singerName() { return this.addBand.get('singerName'); }
  get year() { return this.addBand.get('year'); }
  get style() { return this.addBand.get('style'); }
  /*   get bandPic() { return this.addBand.get('bandPic'); }
  */
  private buildForm() {
    this.addBand = this._fb.group({
      bandId: [''],
      'bandName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      singerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      style: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]]
    })
    this.bandName = this.addBand.controls['bandName'];
  }

  checkIfbanNameAlreadyExist(bandNameTypedByUser: AbstractControl) {
    this._bandsFromDBService.getBands().subscribe((data: Bands[]) => {
      const doesBandNameExist = data.some(({ bandName }: Bands) => bandName === bandNameTypedByUser.value)
      if (doesBandNameExist) {
        return this.message1 = "Ce groupe existe déjà !"
      } else {
        return this.message1 = ""
      }
    })

  }
  submitBand(event: Event) {
    event.preventDefault();
    if (this.message1.length > 0) {
      return;
    }
    if (this.addBand.valid) {
      this.imageComponentIsDisplayed = true
      var dataForm = new FormData();
      dataForm.append('bandName', this.addBand.value.bandName);
      dataForm.append('singerName', this.addBand.value.singerName);
      dataForm.append('year', this.addBand.value.year);
      dataForm.append('style', this.addBand.value.style);
      // attendre et proposer d'ajouter une image ?
      this._bandsFromDBService.createBand(dataForm).subscribe((data) => {
        console.log('data', data);
        console.log('dataform', dataForm);
        console.log("ouiiiiii");
        console.log('this.addBand.value.bandName', this.addBand.value.bandName);
        console.log('this.addBand.value.bandId', this.addBand.value.bandId);

        this.failureMessage = false;
        this.victoryMessage = true;
        this.addBand.reset()
      })

    } else {
      this.successMessage = false;
      this.failureMessage = true;
    }
  }
  //24/06 18:18 voir
  toggleComponentUploadImages() {
    this.showComponentUploadImages = !this.showComponentUploadImages
  }
  // Si on utilise addBand.errors, ce n'est pas bon car la validation se fait uniquement pour chaque input et non pour le formulaire lui-mê
  formIsValid() {
    if ((this.singerName?.errors || this.year?.errors || this.bandName?.errors || this.style?.errors)) {

      console.log("non pas ok");

    } else {
      console.log("youpi");

    }
    this.formIsValid()
    /*  !this.bandName?.errors
     !this.singerName?.errors
     !this.year?.errors
     !this.style?.errors */

  }
  resetForm() {
    this.addBand.reset()
  }
}
