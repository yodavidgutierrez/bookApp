import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author =  new AuthorModel();

  constructor() { }

  ngOnInit() {
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log("formulario invalido");
      return;
    }
      console.log(form);
      console.log(this.author);
  }

}
