import { BookModel } from './../../models/book.model';
import { AuthorModel } from 'src/app/models/author.model';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author/author.service';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book = new BookModel();
  authorsList: AuthorModel[];
  libritos: any
  constructor(private authorService: AuthorService, private bookService:BookService ) { }

  ngOnInit() {
    this.authorService.getAllAuthors().subscribe( res => {
      this.authorsList = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as AuthorModel;

      })
  })
  }

  guardar(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value.autor);
    let peticion: Promise<any>;
   /* if(this.book.id ){
      peticion = this.authorService.updateAuthorById( this.author);

      console.log(this.author.id);
    }*/
    //else{
      peticion = this.bookService.createBook(form.value.autor,  this.book);
   // }

  }


}
