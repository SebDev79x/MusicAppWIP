import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bands } from '../bands';
import { Albums } from '../albums';
import { Observable } from 'rxjs';
import { Songs } from '../songs';

@Injectable({
  providedIn: 'root'
})
export class SongsFromDbService {

/*   constructor(private http: HttpClient) { }
  getSongsByBand(bandId:number){
    return this.http.get<Songs[]>('http://localhost/SuperApp/songsListByAlbum.php?bandId='+ bandId);
  }
  getSongsByAlbum(bandId:number){
    return this.http.get<Songs[]>('http://localhost/SuperApp/songsListByAlbum.php?bandId='+ bandId)
  } */
}
