import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandsFromDBService } from '../../services/bands-from-db.service';
import { Bands } from '../../bands';
import { Router, Params, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  bands: Bands[] = [];
  public changeBandName = '';
  public changeSingerName = '';
  public changeYear = '';
  public changeStyle = '';
  public oneBand: Bands = <Bands>{};

  addBand!: FormGroup;
  constructor(private _fb: FormBuilder, private _bandsFromDBService: BandsFromDBService,
    private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this._routes.snapshot.paramMap.get('bandId')!;
    this._bandsFromDBService.getBands().subscribe((bands: Bands[]) => {
      this.oneBand = bands.find(band => band.bandId == id)!
      console.log('this.oneBand',this.oneBand);

      if (this.oneBand === undefined) {
        this._router.navigate(['/page-not-found'])

      }
      console.log('this.oneBand', this.oneBand)
    });

    const routeParams = this._routes.snapshot.params;
    console.log(routeParams);

    this.addBand = this._fb.group({
      bandId: [],
      bandName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      singerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      style: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]]

    })
    this._bandsFromDBService.getById(routeParams.bandId).subscribe((data: any) => {
      console.log('Youpi', routeParams.bandId);
      this.addBand.patchValue(data);
            console.log('Youpi2', data);

    })
  }

  updateBand() {
    console.log('this.addBand.value', this.addBand.value)
    this._bandsFromDBService.updateBand(this.addBand.value).subscribe(() => {
      this._router.navigate(['view']);
      console.log('Youpi3', this._router.navigate(['view'])
      );

    },
      error => {
        alert(error);
      });
  }


}
