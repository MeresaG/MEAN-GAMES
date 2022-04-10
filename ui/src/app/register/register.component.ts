import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  constructor() {
    this.registrationForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl()
    })
   }

  ngOnInit(): void {
  }

  register() {
    //this.registrationForm  = registrationForm.value;
    console.log(this.registrationForm.value);
    
  }

}
