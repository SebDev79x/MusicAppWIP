import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IBand } from '../components/bands/bandsInterface';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BandsListInfosService {
  public result!:any;
/*   private readonly BANDS_API_URL = 'http://localhost:3000/bands';
 */  constructor(
    private http: HttpClient
  ) { }

/*   public getBands(): Observable<IBand[]> {
    return this.http.get<IBand[]>(this.BANDS_API_URL).pipe(
       tap(bands => console.log('CL BANDLIST :', bands)),
       catchError(this.handleError)
    );
  } */
/*


  private handleError(error: HttpErrorResponse) {
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
