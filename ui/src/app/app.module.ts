import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameComponent,
    FooterComponent,
    HomeComponent,
    NavigationComponent,
    StarsRatingComponent,
    DeleteGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'games',
        component:GamesComponent
      },
      {
        path:'game/:gameId',
        component:GameComponent
      },
      {
        path:'**',
        component:ErrorPageComponent
      }
    ]),
    FontAwesomeModule
  ],
  providers: [GamesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
