import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit{

  // _rating : number = 0;
  // stars:number[] = [];
  // @Input()
  // set rating(rating:number) {
  //   this.stars = new Array<number>(rating);
  // }


  @Input() 
  rating:number = 0;
  stars :number[] = []
  constructor() {
    this.stars = new Array<number>(0);
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.stars = new Array<number>(this.rating)
  }

//   rating: number= 0;
//   stars: number[]= [];
// ngOnChanges(changes: SimpleChanges): void {
// this.stars= new Array<number>(changes['rating'].currentValue);
// };


  ngOnInit(): void {
  }

}
