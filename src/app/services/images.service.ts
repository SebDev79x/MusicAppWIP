import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bands } from '../bands';
import { Images } from '../images';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private _http:HttpClient) { }
/**
 *
 * @param id_band // id du groupe
 * @param formData // données du formulaire (image)
 * @returns // Ajoute image depuis le formulaire dans le dossier uploads et en bdd avec id du groupe
 */
 addPicture(id_band:number,formData:FormData):Observable<Images>{
      return this._http.post<Images>('http://localhost/SuperApp/files/uploadFile2.php?bandId='+ id_band, formData );

  }

/**
 *
 * @param id_band
 * @returns Permet de récupérer toutes les lignes de la table Images correspondant à un id groupe
 */
  getPictureInfosForABand(id_band:Number):Observable<Images[]>{
return this._http.get<Images[]>('http://localhost/SuperApp/files/imagesList.php?bandId=' + id_band)
  }
  /**
 *
 * @param id_band
 * @returns Permet de récupérer l'image correspondant à un id groupe
 */
  getPictureForABand(id_band:Number):Observable<Images>{
    return this._http.get<Images>('http://localhost/SuperApp/files/blob.php?bandId=' + id_band, {responseType : 'json'})
  }
    /**
 *
 * @param
 * @returns Permet de récupérer 1 tableau d'objets : liste d'images
 */
      getPictures():Observable<Images[]>{
      return this._http.get<Images[]>('http://localhost/SuperApp/files/imagesList2ToAddUnavailabeOnes.php')
    }
}
