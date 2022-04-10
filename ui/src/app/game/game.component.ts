import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game!:Game;
  
  constructor(private route:ActivatedRoute, private gamesService: GamesDataService) {
    this.game= new Game("", "", 0);
   }

  ngOnInit(): void {
    const gameId= this.route.snapshot.params["gameId"];
    this.gamesService.getGame(gameId).subscribe(game => this.game = game)
  }

  // onDelete(gameId:string):void {
  //   this.deleteComponent.onDelete(gameId);
  //   this.router.navigate(['/games']);
  // }

}
