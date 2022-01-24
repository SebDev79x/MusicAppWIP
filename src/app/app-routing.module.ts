import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { BandDetailsComponent } from './components/bands/band-details/band-details.component';
import { BandsComponent } from './components/bands/bands.component';
import { HomeComponent } from './components/home/home.component';
import { SongsComponent } from './components/songs/songs.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewComponent } from './components/view/view.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewBandComponent } from './components/view-band/view-band.component';
import { ViewBandGuard } from './components/view/view-band.guard';
import { UploadimagesComponent } from './uploadimages/uploadimages.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersListComponent } from './components/usersList/usersList.component';
import { ConnectionComponent } from './connection/connection.component'; */

const routes: Routes = [
  /* { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'add', component: AddComponent },
  { path: 'connection', component: ConnectionComponent },

  { path: 'uploadimages/:bandId', component: UploadimagesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'view', component: ViewComponent },
  { path: 'editBand/:bandId', component: EditComponent },
  { path: 'usersList', component: UsersListComponent },
  {
    path: 'view-band/:bandId', component: ViewBandComponent,
    canActivate: [ViewBandGuard]
  },
  { path: '**', component: PageNotFoundComponent }
 */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
