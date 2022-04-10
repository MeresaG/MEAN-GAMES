import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  addForm!:FormGroup;
  status!:string;

  constructor(public fb : FormBuilder, private gamesService: GamesDataService) { 
    this.addForm = this.fb.group({
      title : [''],
      year : [''],
      rate: [''],
      price: [''],
      minPlayers: [''],
      maxPlayers: [''],
      minAge: [''],
      designers:['']
    })
  }

  ngOnInit(): void {
  }

  add() : void {
    // let formData: FormData = new FormData();
    // formData.append('title', this.addForm.get('title')!.value);
    // formData.append('year', this.addForm.get('year')!.value);
    // formData.append('rate', this.addForm.get('rate')!.value);
    // formData.append('price', this.addForm.get('price')!.value);
    // formData.append('minPlayers', this.addForm.get('minPlayers')!.value);
    // formData.append('maxPlayers', this.addForm.get('maxPlayers')!.value);
    // formData.append('minAge', this.addForm.get('minAge')!.value);
    // console.log(formData);
    this.gamesService.addGame(this.addForm.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
      complete: () => {
        this.addForm.reset();
        this.status = "Done!"}
      
    });
    
  }

}
