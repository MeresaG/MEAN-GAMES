import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game, GamesComponent } from '../games/games.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent implements OnInit{

  faTimes = faTimes;
  _gameId!:string;
  @Input()
  set gameId(gameId:string){
    this._gameId = gameId;
  }

  constructor(private router:Router, private gamesService:GamesDataService) { 

  }

  onDelete() {
    
    this.gamesService.deleteGame(this._gameId).subscribe(() => this.router.navigate([""]));
    
  }

  ngOnInit(): void {
  }

}
