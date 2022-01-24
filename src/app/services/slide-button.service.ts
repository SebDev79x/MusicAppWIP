import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../users';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Injectable({
  providedIn: 'root'
})
export class SlideButtonService {
  // Valeur de slideToggleState avant souscription = false
  /*   public slideToggleState = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('toggleState')!))
   */  // Méthode asObservable() pour créer une observable
  public slideToggleState = new BehaviorSubject<boolean>(false)

  public slideToggleStateAsObservable = this.slideToggleState.asObservable()
  constructor() {
    this.slideToggleState.next(JSON.parse(localStorage.getItem('toggleState')!))
  }
  shareToggleButtonState(value: any) {
    this.slideToggleState.next(value)

  }
}
