import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;


  @ViewChild ('paragraph') public paragraph! : ElementRef;
  public time!: any;
  public count!:any;
  public displayCurrentTime!: any;
  public audio = new Audio;
  public isMusicBeingPlayed!:any;
  public music!:any;

  constructor(private _router : Router) {
/*     _router.events.subscribe((event) => {
      event
      this.isMusicBeingPlayed = false
console.log('valeur de this.isMusicBeingPlayed', this.isMusicBeingPlayed);



    });
 */
  }

  ngOnInit(): void {
    this.music = "assets/sounds/testtitre.mp3";


  }
  countClicks(event:any){
/*     let p = this.paragraph.nativeElement;
    p.innerHTML = "Nombre de clicks = " + (this.count+=2)
 this.count = event.count()
console.log(this.count++); */


  }
  onAudioPlay(){
    this.audioPlayerRef.nativeElement.play();
  }
  stopMusic(){
    this.audio.pause()
  }
  playMusic(){
    // Si clic, lance le lecteur
    // Si clic de plus, rien ne se

    this.isMusicBeingPlayed = true
    this.audio.src = "assets/sounds/testtitre.mp3";
    this.audio.load()

    this.audio.play()

  }
  launchMusic(event: any) {
    console.log('this.audio.play.length',this.audio.currentTime);

/*    console.log('event cancelable', event.cancelable);
 */ /* if(this.audio.play.length > 0){
   event.preventDefault()
   this.stopMusic()
 }else{
   this.playMusic()
 } */
/* event.preventDefault()
 */
/* console.log('event.preventDefault()',event.preventDefault());
 */
/* let musicIsBeingPlayed = this.playMusic()
 */
/*
 */
/* console.log('audio.buffered',audio.buffered.length)
console.log('audio.onplay',audio.onplay)
console.log('audio.played',    audio.played); */

/* if(audio.buffered.length >0){
  audio.play()

} */
/*    audio.HAVE_NOTHING;
    if (!audio.HAVE_NOTHING) {
      event.preventDefault()
    } */
  }

}
