import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ BandsListInfosService} from 'src/app/services/bandsList-infos.service';
import { SongsService } from 'src/app/services/songs.service';
import { IBand } from '../bandsInterface';
@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.scss']
})
export class BandDetailsComponent implements OnInit {


  public band : IBand = <IBand>{};



  constructor(
    private route : ActivatedRoute,
    private bandDetailsService : BandsListInfosService,
    private songsService : SongsService
/*     private SongsServiceService : SongsServiceService
 */  ) { }

  ngOnInit(): void {
   /*  const id : number = +this.route.snapshot.paramMap.get('id')!;
this.bandDetailsService.getBands().subscribe((bands:IBand[])=>{
this.band = bands.find(band => band.id === id)!;
 }); */


 /*TEST*/
/* console.log('1ère étape : ',this.route);
console.log('2ème étape : ',this.route.snapshot);
console.log('3ème étape : ',this.route.snapshot.paramMap);
console.log('4ème étape : ',this.route.snapshot.paramMap.get('id'));
console.log('this.band : ',this.band);
console.log('this.songsBand : ',this.songsBand); */

   /*TEST*/

   }

}
