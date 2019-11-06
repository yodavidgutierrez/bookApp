import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../services/author/author.service';
import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author =  new AuthorModel();

  constructor(private authorService: AuthorService,private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.authorService.getAuthor( id )
        .subscribe( (resp: any) => {
          this.author = resp;
          this.author.id = id;
        });

    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      return;
    }
    let peticion: Promise<any>;
    if(this.author.id ){
      peticion = this.authorService.updateAuthorById( this.author);

      console.log(this.author.id);
    }
    else{
      peticion = this.authorService.createAuthor(this.author);
      console.log(this.author.id);
      console.log(form.value.id);
    }

  }

}
