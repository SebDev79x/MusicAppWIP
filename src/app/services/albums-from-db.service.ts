import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Bands } from '../bands';
import { Albums } from '../albums';
import { Observable } from 'rxjs';
import { Songs } from '../songs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsFromDbService {

  constructor(private _http: HttpClient) { }

  getAlbums(): Observable<Albums[]> {
    return this._http.get<Albums[]>('http://localhost/SuperApp/albumsList.php');
  }
  getAlbumsForABand(bandId: number): Observable<Albums[]> {
    return this._http.get<Albums[]>('http://localhost/SuperApp/albumsListByBand.php?bandId=' + bandId);
  }
  getSongsByAlbum(selectedAlbum: string): Observable<Songs[]> {
/*     let params1 = new HttpParams().set('bandId', bandId)
 */
    let params2 = new HttpParams().set('albumId', selectedAlbum)
    /*     return this.http.get('http://localhost/SuperApp/songsListByAlbum.php?albumId=', {params:params1});
     */
    return this._http.get<Songs[]>('http://localhost/SuperApp/songsListByAlbum.php', { params: params2 });

  }


}
