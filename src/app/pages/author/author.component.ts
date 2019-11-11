import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { NgForm } from '@angular/forms';
import { AuthorService } from '../../services/author/author.service';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author =  new AuthorModel();

  constructor(private authorService: AuthorService,private route: ActivatedRoute, private rr:Router) { }

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
      Swal.fire(
        'Buen trabajo!',
        'Se ha actualizado el autor  ' + this.author.nombre+'!!',
        'success'
      )
      this.rr.navigate(['authors'])
    }
    else{
      peticion = this.authorService.createAuthor(this.author);
      Swal.fire(
        'Buen trabajo!',
        'Se ha registrado un nuevo autor!',
        'success'
      )

      this.rr.navigate(['authors'])
    }

  }

}
