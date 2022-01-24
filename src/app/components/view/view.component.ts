import { HostListener, EventEmitter, Component, OnInit, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { BandsFromDBService } from '../../services/bands-from-db.service';
import { Bands } from '../../bands';
import { Images } from '../../images';
import { Albums } from '../../albums';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumsFromDbService } from 'src/app/services/albums-from-db.service';
import { forEachChild } from 'typescript';
import { element } from 'protractor';
import { keyframes, transition } from '@angular/animations';
import { AfterViewInit, Directive, QueryList, ViewChildren } from '@angular/core';
import { trigger, state, style, animate } from '@angular/animations';
import { ImagesService } from 'src/app/services/images.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { url } from 'node:inspector';
import { Band } from '../bands/bandsInterface';
import { fromEvent, Observable, Subscription, BehaviorSubject, from, of } from "rxjs";
import { animation, AnimationEvent } from '@angular/animations';
import { LogicalProjectPath } from '@angular/compiler-cli/src/ngtsc/file_system';
import { nextTick } from 'node:process';
import { Injectable } from '@angular/core';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../services/auth.service';
// Pour passer outre les styles :   encapsulation: ViewEncapsulation.None => afin de centrer le contenu de pagination, voir view.component.scss
import { ViewEncapsulation } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  // 04/06/21 VOIR POUR ENLEVER ENCAPSULATION CAR SOUCI DE STYLE SUR AUTRES PAGES
  encapsulation: ViewEncapsulation.ShadowDom,

  animations: [
    trigger('launchSlideToLeftCard2', [
      state('slideToLeft', style({
        transition: 'transform 1s',
        transform: 'translate(-50%)'
      })),
      state('originalPositionCard2', style({
        transition: 'transform 1s',
        transform: 'translate(0)'
      }))/* ,
      transition('launchSlideToLeftCard2 <=>originalPositionCard2', [animate('10s')]) */
    ]),
    trigger('launchSlideToRightCard3', [
      state('slideToRight', style({
        transition: 'transform 1s',
        transform: 'translate(50%)'
      })),
      state('originalPositionCard3', style({
        transition: 'transform 1s',
        transform: 'translate(0)'
      }))
    ]),
    //test
    trigger('launchSlideToUpCard2', [
      state('slideToUp', style({
        transition: 'transform 1s',
        transform: 'translateY(-50%)'
      })),

      state('originalPositionCard2Y', style({
        transition: 'transform 1s',
        transform: 'translateY(0)'
      }))
    ]),
    trigger('launchSlideToDownCard3', [
      state('slideToDown', style({
        transition: 'transform 1s',
        transform: 'translateY(50%)'
      })),
      state('originalPositionCard3Y', style({
        transition: 'transform 1s',
        transform: 'translateY(0)'
      }))
    ])
  ]
})

export class ViewComponent implements OnInit {
  //Used to get the QueryList of elements or directives from the view DOM
  @ViewChildren('card2') private card2!: QueryList<ElementRef>;
  @ViewChild('card3') private card3!: QueryList<ElementRef>;
  @Output() onchange: EventEmitter<any> = new EventEmitter();
  @ViewChildren('search') private search!: ElementRef;
  @ViewChildren('checkbox') private checkboxes!: QueryList<ElementRef>;
  public selectedBands: Bands[] = [] || null;

  public arrayOfCheckedBoxes: Bands[] = [] || null;
  public arrayOfCheckedBoxes$!: Observable<Bands[]>;

/*   public checkedList: BehaviorSubject<Bands[]> = new BehaviorSubject<Bands[]>(JSON.parse(localStorage.getItem('chosenBandsList')!))
 */
/*   public checkedList$ = this.checkedList.asObservable()
 */  public checkedBox: boolean = false;
/*   originPosition: boolean = false;
 */  public albums: Albums[] = [];
  public bands: Bands[] = [];
  public bands2!: any;

  public bandNames: Bands[] = [];

  public enabled: boolean = false;

  public bandId!: number;
  /* public active = true;
  public selectedBand: any; */
  public states: any[] = [];
  public states2: any[] = [];
  public bandName!: any;
  /* public width!: number; */
  public bandsList: any;
  public imagesList: Images[] = [];
  public imagePath: any = 'http://localhost/SuperApp/files/uploads/';
  private _wordToFilterBands = '';
  public filteredBands: Bands[] = [];
  public bandChosenByUser!: any;
  /*  public screenWidth!: number;
   public screenHeight!: number; */
  public userQuality!: string | null;
  public searchForm!: FormGroup;
  public picToFillUpPage!: boolean;
  public numberLetters!: any;
  public searchBand!: string;
  public totalLength!: any;
  public page: number = 1;
  public config: any;
  public youpi!: any;
  public arrayBands!: any;
  constructor(private _fb: FormBuilder, private _auth: AuthService, private _host: ElementRef, private _domSanitizer: DomSanitizer, private _images: ImagesService, private _routes: ActivatedRoute, private _bandsFromDBService: BandsFromDBService, private _router: Router, private _albumsFromDBService: AlbumsFromDbService) {
    this.userQuality = JSON.parse(localStorage.getItem('userQuality')!);
    this.buildForm()
  }

  ngOnInit(): void {

/*     localStorage.setItem('chosenBandsList',JSON.stringify(this.arrayOfCheckedBoxes))
 */

/**
 *
 */    this._auth.qualityUser.subscribe((value) => {
    this.userQuality = value;
  });

 /**
     * à l'initialisation du composant, on récupère la liste des images via getPictures
     */    this._images.getPictures()
      .subscribe((data: Images[]) => {
        this.imagesList = data
      })
    /**
     * à l'initialisation du composant, on récupère la liste des groupes via getBands
     */
    this._bandsFromDBService.getBands()
      // on récupère un tableau d'objets, liste des groupes
      .subscribe((data: Bands[]) => {
        this.bands = data

        this.filteredBands = data
        // Je filtre mon tableau this.bands : je récupère un nouveau tableau ne contenant que les groupes ne possédant pas d'image (!name), j'affecte cela à la variable bandsListWithoutName
        let bandsListWithoutName = this.bands.filter(({ name }: Bands) => !name)
        // Je boucle sur mon nouveau tableau (ne contient uniquement que les groupes dont le name = null)
        // pour remplacer la valeur "null" par le nom de mon image générique
        // afin que chaque carte n'ayant aucune image soit illustrée par une image générique
        bandsListWithoutName.forEach(element => {
          element.name = 'genericRockPic.png'
        });
      });
    /*
  * à l'initialisation du composant, on récupère la liste des albums via getAlbums
  *
  */
    this._albumsFromDBService.getAlbums()
      .subscribe((data2) => {
        this.albums = data2
      });
  }
  /**
   *
   */
  buildForm() {
    this.searchForm = this._fb.group({
      search: [''],
    })
  }
  /**
   * onDelete : pour supprimer un groupe (à remettre dans le template)
   * @param bands
   */
  onDelete(bands: Bands): void {
    this._bandsFromDBService.deleteBand(bands.bandId)
      .subscribe((data: Bands[]) => {
        // ici on fitre le tableau this.bands pour ne récupérer que le groupe que l'on veut supprimer,
        //que l'on passe en paramètre de la fonction onDelete
        this.bands = this.bands.filter(item => item !== bands)
      });
  }
  /**
 * onEdit : lien pour rediriger vers page de modification des infos d'un groupe
 * @param bands
 */
  onEdit(bands: Bands) {
    this.bandId = bands.bandId;
    this._router.navigate(['editBand/' + this.bandId])
  }
  /**
* getById : lien pour rediriger vers la fiche d'un groupe par ID
* @param bands
*/
  getById(bands: Bands) {
    this.bandId = bands.bandId;
    this._router.navigate(['view-band/' + this.bandId])
  }
  /**
   * addPic : lien pour rediriger vers mini form permettant l'ajout d'une image, pour un groupe donné (par Id)
   * @param bands
   */
  addPic(bands: Bands) {
    this.bandId = bands.bandId;
    this._router.navigate(['uploadimages/' + this.bandId])
  }
  /**
   * toggleDivs : méthode permettant de déterminer les animations des 2 divs superposées (appelons cela une fiche) : card2 vers la gauche, card3 vers la droite
   * Elle prend en argument l'index, tout comme les states, pour que les animations se fassent uniquement sur une fiche donnée
   * @param index
   */
  toggleDivs(index: number) {
    if (window.innerWidth > 741) {
      this.states[index] = this.states[index] === 'slideToLeft' ? 'originalPositionCard2' : 'slideToLeft';
      this.states2[index] = this.states2[index] === 'slideToRight' ? 'originalPositionCard3' : 'slideToRight';
    }
    // Voir pour factoriser les 4 méthodes toggle
    /* else{
      this.states[index] = this.states[index] === 'slideToUp' ? 'originalPositionCard2Y' : 'slideToUp';
      this.states2[index] = this.states2[index] === 'slideToDown' ? 'originalPositionCard3Y' : 'slideToDown';
    } */
  }
  /**
 * toggleDivs : méthode permettant de déterminer les animations des 2 divs superposées (appelons cela une fiche) : card2 vers le centre, card3 vers le centre
 * Elle prend en argument l'index, tout comme les states, pour que les animations se fassent uniquement sur une fiche donnée
 * @param index
 */
  toggleDivsBack(index: number) {
    if (window.innerWidth > 741) {
      this.states[index] = this.states[index] === 'slideToLeft' ? 'originalPositionCard2' : 'slideToLeft';
      this.states2[index] = this.states2[index] === 'slideToRight' ? 'originalPositionCard3' : 'slideToRight';
    }
  }
  // Idem qu'au dessus, sauf qu'ici, puisque la taille de la fenêtre est inférieure à 500 pixels, le déplacement des divs s'effectue verticalement
  toggleDivsY(index: number) {
    if (window.innerWidth < 740 || document.documentElement.clientWidth < 740) {
      this.states[index] = this.states[index] === 'slideToUp' ? 'originalPositionCard2Y' : 'slideToUp';
      this.states2[index] = this.states2[index] === 'slideToDown' ? 'originalPositionCard3Y' : 'slideToDown';
    }
  }
  toggleDivsBackY(index: number) {
    if (window.innerWidth < 740 || document.documentElement.clientWidth < 740) {
      this.states[index] = this.states[index] === 'slideToUp' ? 'originalPositionCard2Y' : 'slideToUp';
      this.states2[index] = this.states2[index] === 'slideToDown' ? 'originalPositionCard3Y' : 'slideToDown';
    }
  }
  /**
   * Méthode permettant de détecter le redimensionnement de la fenêtre
   * SINON gros souci d'affichage
   * @param event
   * @param index
   */
  onWindowResize(event: any, index: number) {
    //good, cartes reprenant leur position initiale
    this.states[index] = this.states[index] === 'originalPositionCard2Y';
    this.states2[index] = this.states2[index] === 'originalPositionCard3Y';
  }
  /**
    * Getter : valeur UNIQUEMENT LUE, pour récupérer une propriété, parenthèses obligatoires quand on utilise le get,
    * parenthèses à retirer quand on l'appelle
    * wordToFilterBands retourne le mot saisi par l'utilisateur,
    * plus précisément le 'filter' affecté à _wordToFilterBands du setter wordToFilterBands
    */
  public get wordToFilterBands(): string {
    return this._wordToFilterBands;
  }
  /**
   * Setter : modif uniquement
   *
   */
  public set wordToFilterBands(filter: string) {
    this._wordToFilterBands = filter;
    this.filteredBands = this.wordToFilterBands ? this.filterBands(this.wordToFilterBands) : this.bands;

  }
  /**
  * Filtre de la liste
  * Méthode privée (qui prend en paramètre le critère de recherche (criteria))
  * qui va retourner la liste des groupes correspondant au critère
  */
  private filterBands(criteria: string): Bands[] {
    criteria = criteria.toLocaleLowerCase();
    let bandChosenByUser = this.bands.filter((element: Bands) =>
      // à remettre si test non concluant 15h40 27/05
      // element.bandName.toLocaleLowerCase().indexOf(criteria) !== -1);
      element.bandName.toLocaleLowerCase().includes(criteria));
    if ((bandChosenByUser.length == 0)) {
      this.picToFillUpPage = true;
      setTimeout(() => {
        this.wordToFilterBands = ''
        this.picToFillUpPage = false;
        this.page = 1
        return this.filteredBands
      }, 2000)
    }
    if (bandChosenByUser.length > 0 || ((bandChosenByUser.length > 0) && (this.wordToFilterBands = ''))) {
      this.picToFillUpPage = false;
      this.page = 1
    }
    return bandChosenByUser;
  }/*
public get boxId():Bands[]{
  return this.bands.filter((item:Bands)=>{
     this.bandId = item.bandId
    console.log('this.bandId',this.bandId);

  })
} */
  // Partie CHECKBOX         this.bands = this.bands.filter(item => item !== bands)
  /* v */

  getCheckedBoxes2(event: any, bands: Bands) {
    if ((event.target.checked)) {
if(this.arrayOfCheckedBoxes && this.arrayOfCheckedBoxes.length > 0){
this.bands.map((band)=>{
  this.arrayOfCheckedBoxes.map((item)=>{
    if(band.bandId == item.bandId) {
      band.fav = true;
      }
  })
})
}
this.arrayOfCheckedBoxes.push(bands)

    }else{
      this.arrayOfCheckedBoxes = this.arrayOfCheckedBoxes.filter((item) => item != bands)

    }
    localStorage.setItem('chosenBandsList', JSON.stringify(this.arrayOfCheckedBoxes))

    this._bandsFromDBService.storeUserBandsList(this.arrayOfCheckedBoxes)
    /*     let youpi = JSON.parse(localStorage.getItem('chosenBandsList')!)
     */
    /* if(JSON.parse(localStorage.getItem('chosenBandsList')!)){
     */
  /*   if ((event.target.checked)) {

      this.arrayOfCheckedBoxes.push(bands)

    } else {
      this.arrayOfCheckedBoxes = this.arrayOfCheckedBoxes.filter((item) => item != bands)
    }

    localStorage.setItem('chosenBandsList', JSON.stringify(this.arrayOfCheckedBoxes))

    this._bandsFromDBService.storeUserBandsList(this.arrayOfCheckedBoxes) */


  }

  /*   isChecked(bandId:Bands){
      for (let index = 0; index < this.arrayOfCheckedBoxes.length; index++) {
        if(bandId == this.arrayOfCheckedBoxes[index]){
          return true;
       }
     }
     return false;
    } */
}

