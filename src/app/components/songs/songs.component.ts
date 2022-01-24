import { Component, OnInit } from '@angular/core';
import { BandsListInfosService } from 'src/app/services/bandsList-infos.service';
import { ActivatedRoute } from '@angular/router';
import { IBand } from '../bands/bandsInterface';
import { SongsService } from 'src/app/services/songs.service';
import { HttpClient } from '@angular/common/http';
import { ISong } from './songsInterface';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
/* module "c:/Users/Littl/SuperApp/src/app/components/bands/iband"
 */
export class SongsComponent implements OnInit {
  public title = 'Liste des ziks';

  public songs : ISong[] = [];
  public errorMsg2! :string;
  /* public bandId:number;
   */
  constructor(
    private route: ActivatedRoute,
    private songsService : SongsService
    ) {}



  ngOnInit(): void {/*
    this.songsService.getSongs().subscribe({
      next: song => this.songs = song,
      error: err2 => this.errorMsg2 = err2
    }); */
   /*  const id : number = +this.route.snapshot.paramMap.get('id')!;
    this.songsService.getSongs().subscribe((songs:ISong[]) =>{
     this.song = songs.find(song => song.bandId === id)!;
    }) */
    /*
    const id : number = +this.route.snapshot.paramMap.get('id')!;
    this.bandDetailsService.getBands().subscribe((bands:IBand[])=>{
    this.band = bands.find(band => band.id === id)!;
     }); */
    /*     const id : number = +this.route.snapshot.paramMap.get('id')!;
    this.songsForThisBand.getSongs().subscribe((songs:IBand[])=>{
    this.band = songs.find(band => band.id === id)!;
    console.log(songs.find(band => band.id === id)!);
     }); */
    /*   this.songs = this.bandDetailsService.getSongs();

 this.band = songs.find(band => band.id === id)!;
     console.log('De songsComponent : ', this.bandDetailsService.getSongs());
     console.log('De songsComponent : ', this.songs); */


  }

}
