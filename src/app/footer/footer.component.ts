import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  public route!: any;
  public route2!: string;
  public isButtonDisplayed = false;
  public currentYear = new Date();
  @ViewChild('myEntireFooter') myEntireFooter!: ElementRef;
  @ViewChild('buttonHome') buttonHome!: ElementRef;

  constructor(private _datePipe: DatePipe, private _router: Router, private _renderer: Renderer2, private _routes: ActivatedRoute) {
    // ici on récupère l'URL de la page, de façon à déterminer où l'on se trouve et
    // masquer le bouton 'retour' lorsque l'on se trouve sur la page Home, voir le template avec *ngIf
    this._router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: any) => {
        data
        this.route = this._router.routerState.snapshot.url
        if (this.route == '/home') {
          this.isButtonDisplayed = false;
          let myEntireFooter = this.myEntireFooter
          myEntireFooter.nativeElement.style.position = 'relative';
          myEntireFooter.nativeElement.style.height = '150px';
        } else {
          this.isButtonDisplayed = true;
          let myEntireFooter = this.myEntireFooter
          myEntireFooter.nativeElement.style.height = '150px';
        }
        if (this.route == '/view') {
          let myEntireFooter = this.myEntireFooter
          myEntireFooter.nativeElement.style.display = 'none';
          setTimeout(() => {
            myEntireFooter.nativeElement.style.display = 'block';
          }, 1000)
        } else {
          let myEntireFooter = this.myEntireFooter
          myEntireFooter.nativeElement.style.display = 'block';

        }
      })
  }



  ngOnInit(): void {
    /* JSON.parse(localStorage.getItem('userQuality')!);
     JSON.parse(localStorage.getItem('userName')!);
    JSON.parse(localStorage.getItem('loggedUser')!); */
    /*   const myObservable = of(JSON.parse(localStorage.getItem('userQuality')!),
      JSON.parse(localStorage.getItem('userName')!),
      JSON.parse(localStorage.getItem('loggedUser')!)

      );

      myObservable.subscribe((value:FormData) => {
          console.log(value);  // 6
      }); */
  }


  // à conserver ^pour le moment
  /* let arrayRoutes = this._router.config
  console.log('this.myFooter', this.myFooter.nativeElement);
       let footer = this.myFooter.nativeElement
        let routesKeysToCustom = [1,2,3,4,8]
  //function callback anonyme; //3 params, 1er = élément, 2ème = clé de l'index, 3ème = tableau
       let filteredArray = arrayRoutes.filter(function (element, key) {
    console.log(element, key);
    console.log(element.path);
    if (element.path == 'connection') {
      footer.style.position = 'absolute';
      footer.style.marginBottom = '0';

    }
  }); */
  // à conserver ^pour le moment
}

