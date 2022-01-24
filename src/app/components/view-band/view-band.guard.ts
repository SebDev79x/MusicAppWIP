import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewBandGuard implements CanActivate {
  constructor(private _router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // id = id saisi par utilisateur, 1 correspond à l'objet 1 dans url, voir console.log(route)
    // next.url[1].path retourne un string, faut le convertir en Number avec +
    // ATTENTION, ça ne protège pas d'un nombre saisi ne correspondant à aucun ID.
    // VOIR view-band.component pour protection contre id inconnu en bdd
    // Et voir pour ajot vérification directement ici
    const id = +next.url[1].path;
    if (isNaN(id) || id <= 0) {
      console.log('next', next);

      this._router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
