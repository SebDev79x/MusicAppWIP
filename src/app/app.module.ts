import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BandsComponent } from './components/bands/bands.component';
import { SongsComponent } from './components/songs/songs.component';
import { BandDetailsComponent } from './components/bands/band-details/band-details.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewBandComponent } from './components/view-band/view-band.component';
import { ViewBandGuard } from './components/view-band/view-band.guard';
import { UploadimagesComponent } from './uploadimages/uploadimages.component';
import { ConnectionGuard } from './connection/connection.guard';
import {
  NgResizeObserver,
  ngResizeObserverProviders
} from "ng-resize-observer";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegistrationComponent } from './registration/registration.component';
import { UsersListComponent } from './components/usersList/usersList.component';
import { MatTableModule } from '@angular/material/table';
import { ProfileComponent } from './components/profile/profile.component';
import { ConnectionComponent } from './connection/connection.component';
import { ButtonComponent } from './components/button/button.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { RegistrationGuard } from './registration/registration.guard';
import { UsersListGuard } from './components/usersList/users-list.guard';
import { AddGuard } from './components/add/add.guard';
import { UploadimagesGuard } from './uploadimages/uploadimages.guard';
import { EditbandGuard } from './components/edit/edit.guard';
registerLocaleData(localeFr, 'fr');
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileGuard } from './components/profile/profile.guard';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MylistComponent } from './mylist/mylist.component';
@NgModule({
  declarations: [
    AppComponent,
    BandsComponent,
    SongsComponent,
    BandDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    AddComponent,
    ViewComponent,
    HeaderComponent,
    FooterComponent,
    EditComponent,
    ViewBandComponent,
    UploadimagesComponent,
    RegistrationComponent,
    UsersListComponent,
    ProfileComponent,
    ConnectionComponent,
    ButtonComponent,
    PaginationComponent,
    MylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatTableModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    RouterModule.forRoot([

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      /*    { path: 'bands', component: BandsComponent },
         { path: 'bands/:id', component: BandDetailsComponent },
         { path: 'songs', component: SongsComponent },
         { path: 'songs/:bandId', component: SongsComponent }, */
      { path: 'add', component: AddComponent, canActivate: [AddGuard] },
      { path: 'registration', component: RegistrationComponent, canActivate: [RegistrationGuard] },
      { path: 'uploadimages/:bandId', component: UploadimagesComponent, canActivate: [UploadimagesGuard] },
      { path: 'view', component: ViewComponent },
      { path: 'editBand/:bandId', component: EditComponent, canActivate: [EditbandGuard] },
      { path: 'usersList', component: UsersListComponent, canActivate: [UsersListGuard] },
      { path: 'connection', component: ConnectionComponent, canActivate: [ConnectionGuard] },
      { path: 'page-not-found', component: PageNotFoundComponent },

      {
        path: 'view-band/:bandId', component: ViewBandComponent,
        canActivate: [ViewBandGuard]
      },
      { path: 'profile/:userId', component: ProfileComponent, canActivate: [ProfileGuard] }
      ,
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [{ provide: localeFr, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
