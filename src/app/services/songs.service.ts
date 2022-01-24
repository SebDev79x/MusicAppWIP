import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IBand } from '../components/bands/bandsInterface';
import { ISong } from '../components/songs/songsInterface';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
/*   private readonly SONGS_API_URL = 'http://localhost:3001/songs';
 */
  constructor(
    private http: HttpClient

  ) { }

/*   public getSongs(): Observable<ISong[]> {
    return this.http.get<ISong[]>(this.SONGS_API_URL).pipe(
      tap(songs => console.log('CL SONGSLIST :', songs)),
      catchError(this.handleError)
    );
  }

   public getSongsForThisBand(selectedBandId:string): Observable<any>{
     let params1 = new HttpParams().set('bandId', selectedBandId);
     console.log('selectedBandId dans songsService : ', selectedBandId);
     console.log('CL this.SONGS_API_URL,{params:params1}',this.SONGS_API_URL,{params:params1});

    return this.http.get(this.SONGS_API_URL,{params:params1});
  } */

   /*TEST*/
/*    this._http.get(this._producturl,{params : params}).pipe(map((response) => {
    response = response.filter((data) => data.projectname === "Sasi" );
    return response;
})).subscribe( (res:Response)=>{
    this.data = <IProduct[]> res.json();
    console.log(this.data);
}) */
   /*TEST*/

/*   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `OUPS Y A UNE ERREUR : ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  } */

  }
