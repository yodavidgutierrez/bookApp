import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookList: BookModel[] = [];
  cargando = false;
  constructor(private bookService: BookService, private authorService: AuthorService) { }

  ngOnInit() {
    this.bookService.getAllBook();
  }

  deleteBook(id, i){

  }

}
