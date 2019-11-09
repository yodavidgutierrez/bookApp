import { BookModel } from './../../models/book.model';
import { AuthorModel } from 'src/app/models/author.model';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author/author.service';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book = new BookModel();
  authorsList: AuthorModel[];
  libritos: any
  idAuthor: any;
  constructor(private authorService: AuthorService, private bookService:BookService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.authorService.getAllAuthors().subscribe( res => {
      this.authorsList = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as AuthorModel;

      })
  })
  this.idAuthor = this.route.snapshot.paramMap.get('idAutor');
  const idBook = this.route.snapshot.paramMap.get('idBook');

    if ( this.idAuthor && idBook !== 'nuevo' ) {

      this.bookService.getBook( this.idAuthor,idBook )
        .subscribe( (resp: any) => {
          this.book = resp;
          this.book.id =idBook ;
          this.book.autor = this.idAuthor;
        });

    }
  }

  guardar(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value.autor);
    let peticion: Promise<any>;
   if(this.book.id ){
      peticion = this.bookService.updateBookById( this.idAuthor,this.book);
    }
    else{
      peticion = this.bookService.createBook(form.value.autor,  this.book);
   }

  }


}
