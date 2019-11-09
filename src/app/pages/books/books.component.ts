import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from '../../services/author/author.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookList: any[] = [];
  authorsList: AuthorModel[];
  cargando = false;
  constructor(private bookService: BookService, private authorService: AuthorService) {
    this.bookService.getAllBook().subscribe(res=> {
      this.bookList = res.reduce( (prev, current) => {
        if(!!current && !!current.books && current.books.length > 0) {
           current.books.map((book: any) => {
            book.authName = `${current.nombre} ${current.apellido}`;
          })
           prev = prev.concat(current.books);
        }
        return prev;
      }, [])
    })
  }

  ngOnInit() {

}

  deleteBook(idAuthor,idBook,i){
    this.bookService.deleteBook(idAuthor, idBook);

  }

}
