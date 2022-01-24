import { Component, OnInit } from '@angular/core';
import { BandsListInfosService } from 'src/app/services/bandsList-infos.service';
import { IBand } from './bandsInterface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { SongsService } from 'src/app/services/songs.service';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit {
  public title = 'Liste des groupes';
  public errorMsg1!: string;
  public errorMsg2!: string;
public songYTUrl!: string;
  public selectedBand!: number;
  public testStringSelectedBand!: string;
public listSongs!:any;
  private _wordToFilterBands = 'search';
  public bands: IBand[] = [];
  public filteredBands: IBand[] = [];

  constructor(
    private bandsListInfoService: BandsListInfosService,
    private songsService: SongsService
  ) { }

  ngOnInit() {

    /* this.filteredBands = this.bands;
    this.wordToFilterBands = '';
    this.bandsListInfoService.getBands().subscribe({
      next: filteredBands => this.filteredBands = filteredBands,
      error: err2 => this.errorMsg2 = err2
    });
   this.bandsListInfoService.getBands().subscribe({
      next: bands => this.bands = bands,
      error: err1 => this.errorMsg1 = err1
    });
 */


  }
  public get wordToFilterBands(): string {
    return this._wordToFilterBands;
  }
  public set wordToFilterBands(filter: string) {
    this._wordToFilterBands = filter;

    this.filteredBands = this.wordToFilterBands ? this.filterBands(this.wordToFilterBands) : this.bands;
  }
  private filterBands(criteria: string): IBand[] {
    criteria = criteria.toLocaleLowerCase();

const result = this.bands.filter(
      (band: IBand) => band.name.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return result;
  }/*
  onBandSelected(selectedBandId: any):void{
    this.songsService.getSongsForThisBand(selectedBandId).subscribe(
      data =>
      {
        console.log('selectedBandId ', selectedBandId);
        console.log('this.machin ', this.songsService.getSongsForThisBand(selectedBandId));

        this.listSongs = data;
        console.log('data ', data);
        console.log('this.listSongs ', this.listSongs);

      }
    )

  }
 */
}
