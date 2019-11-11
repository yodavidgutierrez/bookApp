import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author/author.service';
import { AuthorModel } from 'src/app/models/author.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authorsList: AuthorModel[];
  cargando = false;
  constructor(private authorService: AuthorService ) { }

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
    Swal.fire({
      title: 'Esta seguro que desea eliminar el autor?',
      text: "No vas a ser capaz de revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.authorsList.splice(i, 1);
    this.authorService.deleteAuthor( id );
        Swal.fire(
          'Autor eliminado!',
          'El autor ha sido eliminado.',
          'success'
        )
      }
    })

  }



}
