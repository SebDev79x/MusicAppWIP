import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BandsFromDBService } from '../services/bands-from-db.service';
import { Bands } from '../bands';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Images } from '../images';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-uploadimages',
  templateUrl: './uploadimages.component.html',
  styleUrls: [/* '../components/add/add.component.scss', */ './uploadimages.component.scss'],
})
export class UploadimagesComponent implements OnInit {
  @Input() childMessage!: string;

  public uploadResponse!: any;
  public bands: Bands[] = [];
  public route!: any;
  public newBandId!: Images;
  public youpi!: number;
  formPic = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  get file() { return this.formPic.get('file'); }


  constructor(private _routes: ActivatedRoute,
    private _bandsFromDBService: BandsFromDBService,
    private _router: Router,
    private _images: ImagesService,
  ) { }
  public selectedFile!: any;
  public oneBand: Bands = <Bands>{};
  get f() {

    return this.formPic.controls;

  }
  ngOnInit(): void {
    /**
     * J'affecte à ma const id l'ID en paramètre d'URL, + pour transformer un string en number
     */
    const id = +this._routes.snapshot.paramMap.get('bandId')!;
    /**
    * Méthode pour récupérer le groupe (objet this.oneBand) parmi la liste des groupes
    */
    this._bandsFromDBService.getBands().subscribe((bands: Bands[]) => {
      this.oneBand = bands.find(band => band.bandId == id)!
      console.log('type of this.oneBand',typeof(this.oneBand));
      console.log('this.oneBand',this.oneBand);

      /**
      * Si this.oneBand est undefined (en changeant manuellement le paramètre d'URL, je move l'user vers la page not-found)
      */
      if (this.oneBand === undefined || null) {
        this._router.navigate(['/page-not-found'])
      }
    });
  }
  setPicture(event: any) {
    if (event.target.files.length > 0) {
      const imageAddedByUser = event.target.files[0];
      this.formPic.patchValue({
        fileSource: imageAddedByUser
      });

    }

  }
  submit() {
    // J'affecte à ma const formData une instance de FormData
    const formData = new FormData();
    // Je récupère le fichier ajouté dans le formulaire (voir pour autoriser certains types tels que png, jpeg, jpg etc. En back ?)
    const imageValue = this.formPic.get('fileSource')!.value
    formData.append('file', imageValue)
    // On récupère l'ID passé dans l'URL
    const id = +this._routes.snapshot.paramMap.get('bandId')!;
    this.route = this._router.routerState.snapshot.url
    console.log('this.route ', this.route);
    console.log('id ', id);

/*     if (this.route == '/uploadimages/' + id) {
 */

      // on récupère les infos liées à l'image (via un subscribe) pour un groupe donné
      this._images.addPicture(id, formData).subscribe((result) => {
        console.log('id du groupe', id)

      })
/*     }
 */
  /*     this._bandsFromDBService.getIdFromBandAddedInParentComponent().subscribe((data: Bands) => {
        data;
        console.log('if(this.route == /add)', data);
        this.youpi = data.bandId
      })
      this._images.addPicture(this.youpi,formData).subscribe((data: any) => {
        data
        console.log('route = add', data);

      }) */


    /*   if(this.route == '/add'){


      } */
  }

}
