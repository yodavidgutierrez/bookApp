import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author/author.service';
import { AuthorModel } from 'src/app/models/author.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authorsList: AuthorModel[];
  cargando = false;
  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.cargando = true;
    this.authorService.getAllAuthors().subscribe( res => {
        this.authorsList = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as AuthorModel;

        })
        this.cargando = false;
    })
  }

  deleteAuthor( id:string, i: number){
    console.log(id);
    this.authorsList.splice(i, 1);
    this.authorService.deleteAuthor( id );
  }



}
