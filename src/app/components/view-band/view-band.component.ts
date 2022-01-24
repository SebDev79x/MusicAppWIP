import { Component, OnInit } from '@angular/core';
import { BandsFromDBService } from 'src/app/services/bands-from-db.service';
import { Bands } from '../../bands';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlbumsFromDbService } from 'src/app/services/albums-from-db.service';
import { Albums } from '../../albums';
import { SongsFromDbService } from 'src/app/services/songs-from-db.service';
import { Songs } from '../../songs';
import { ImagesService } from 'src/app/services/images.service';
import { Images } from '../../images';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-view-band',
  templateUrl: './view-band.component.html',
  styleUrls: ['./view-band.component.scss']
})
export class ViewBandComponent implements OnInit {

  public bands: Bands = <Bands>{};
  public oneBand: Bands = <Bands>{};
  public albumsList: Albums[] = [];
  public albums: Albums[] = [];
  public songs: Songs[] = [];

  public selectedAlbum!: Songs;
  public songsList: Songs[]= [];
  public imagesList: Images[] = [];
  public images: Images[] = [];
  /* public blob: Images[] = [];
  public image!: boolean; */
  public imageBand!: any;

  public genericImage = 'genericRockPic.png';
  public imagePath: any = 'http://localhost/SuperApp/files/uploads/';
  constructor(private _bandsFromDBService: BandsFromDBService, private _albumsFromDBService: AlbumsFromDbService,
    private _router: Router, private _routes: ActivatedRoute, private _images: ImagesService, private _domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
     /**
   * Au clic on affiche l'image liée à l'ID du groupe
   */
      const id = +this._routes.snapshot.paramMap.get('bandId')!;
      this._images.getPictureForABand(id)
        .subscribe((data) => {
          this.imageBand  = data;
       /*    var readThisFilePic: FileReader = new FileReader();

          console.log('this.blob readastext', this.blob);
          readThisFilePic.onloadend = (e) => {
            this.imageUrl = this._domSanitizer.bypassSecurityTrustUrl(this.imagePath + <string>readThisFilePic.result)
            console.log('this.imageUrl',this.imageUrl);

          } */
        });
    /**
 * On récupère ici l'id d'un groupe (pour ensuite afficher toutes ses informations)
 */
    this._bandsFromDBService.getBands().subscribe((bands: Bands[]) => {
      this.oneBand = bands.find(band => band.bandId == id)!;
      if (this.oneBand === undefined) {
        this._router.navigate(['page-not-found'])
      }
    });
    /**
     * On récupère ici les infos de l'image du groupe en question (une image par groupe pour le moment)
     */
    this._images.getPictureInfosForABand((id))
      .subscribe((data:Images[]) => {
        this.imagesList = data;
      });

    /**
     * On récupère ici tous les albums du groupe en question
     */
    this._albumsFromDBService.getAlbumsForABand(id)
      .subscribe((albums: Albums[]) => {
        this.albumsList = albums;
      });


    /**
* On récupère ici TOUTES les chansons du groupe en question
*/
    /*  this._songsFromDBService.getSongsByBand(id)
       .subscribe((songs: Songs[]) => {
         this.songsList = songs;
         console.log('this.songsList', this.songsList)
       }) */
    /*    const bandId = +this.routes.snapshot.paramMap.get('bandId')!;

       this._songsFromDBService.getSongsByAlbum(bandId)
         .subscribe((songs: Songs[]) => {
           this.songsList2 = songs;
           console.log('this.songsList2', this.songsList2)
         }) */

    /*   this._bandsFromDBService.getAlbumsForABand(id2).subscribe((oneBand: Bands[]) => {
        console.log('id2',id2)

      }); */
  }


  onAlbumSelected(selectedAlbum: string) {
    this._albumsFromDBService.getSongsByAlbum(selectedAlbum)
      .subscribe((data:Songs[]) => {
        this.songsList = data;
      })
  }/*
  toggleImages(){
    this.image = !this.image
  } */


}
