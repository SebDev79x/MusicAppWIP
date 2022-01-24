import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bands } from '../bands';
import { Observable,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BandsFromDBService {
  public bandsList = new BehaviorSubject<Bands[] |null>([])
  public bandsList$ = this.bandsList.asObservable()
  constructor(private _http: HttpClient) {

   }
/**
 *
 * @returns liste des groupes j'ai ajouté Observable<Bands[]> le 27/05 à 16h + aux autres
 */
  getBands():Observable<Bands[]> {
    return this._http.get<Bands[]>('http://localhost/SuperApp/test.php');
  }

  /**
   *
   * @param bandId
   * @returns Suppression du groupe
   */
  deleteBand(bandId: number):Observable<Bands[]> {
    return this._http.delete<Bands[]>('http://localhost/SuperApp/delete.php?bandId=' + bandId);
  }
  /**
   *
   * @param band
   * @returns Création d'un groupe ici j'ai remplacé Bands par any pour tester une autre approche, 30/04
   */
  createBand(band:FormData):Observable<Bands> {
    return this._http.post<Bands>('http://localhost/SuperApp/add.php', band);
  }
  /**
   *
   * @param bandId
   * @returns Id du groupe
   */
  getById(bandId: number):Observable<Bands[]> {
      return this._http.get<Bands[]>('http://localhost/SuperApp/getById.php?bandId=' + bandId);


  }
  /**
   *
   * @param band
   * @returns Modification des infos du groupe
   */
  updateBand(band: Bands):Observable<Bands> {
    console.log('band',band);

    return this._http.put<Bands>('http://localhost/SuperApp/editBand.php' + '?bandId=' + band.bandId, band);
  }
  /**
   *
   */
  storeUserBandsList(data:any){

   this.bandsList.next(data)
  }
/**
   *
   */
/*  getIdFromBandAddedInParentComponent():Observable<Bands>{
  return this._http.get<Bands>('http://localhost/SuperApp/add.php')
    } */
/*   getSongsByAlbum(bandId:number, albumId:number ){
    return this.http.get<Bands[]>('http://localhost/SuperApp/songsListByAlbum.php?bandId='+ bandId + '&?albumId=' + albumId)
  } */
}
