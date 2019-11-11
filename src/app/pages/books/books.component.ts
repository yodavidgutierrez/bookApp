import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthorModel } from '../../models/author.model';
import { AuthorService } from '../../services/author/author.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Esta seguro que desea eliminar el libro?',
      text: "No vas a ser capaz de revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.bookList.splice(i, 1);
        this.bookService.deleteBook(idAuthor, idBook);
        Swal.fire(
          'Libro eliminado!',
          'El libro ha sido eliminado.',
          'success'
        )
      }
    })



  }

}
