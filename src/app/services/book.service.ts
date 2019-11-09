import { map, flatMap } from 'rxjs/operators';
import { BookModel } from './../models/book.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { AuthorModel } from '../models/author.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  public bookCollection: AngularFirestoreCollection<BookModel>;
  books: Observable<BookModel[]>;
  author = new AuthorModel();
  constructor(private afs: AngularFirestore) {
    this.bookCollection = this.afs.collection<BookModel>('books');

  }

  createBook(id: string, book: any){
    return this.afs.collection('authors').doc(id).collection('books').add(JSON.parse(JSON.stringify(book)))
  }

  getBook(idAuthor: string, idBook) {
   return this.afs.collection('authors').doc(idAuthor).collection('books').doc(idBook)
    .snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

 //me traer un arreglo con los autores y adentro otro arreglo con los libros como objetos !!importante se necesita al reves
  getAllBook<T extends AuthorModel>( ) {
      return this.afs.collection('authors')
        .snapshotChanges()
        .pipe(
          map(this.convertSnapshots),
          map((documents: T[]) =>
            documents.map(document => {
              return this.afs
               .collection(`authors/${document.id}/books`)
                .snapshotChanges()
                .pipe(
                  map(this.convertSnapshots),
                  map(subdocuments =>
                    Object.assign({ ['books']: subdocuments },document)
                  )
                );
            })
          ),
          flatMap(combined => combineLatest(combined))
        );
    }

     convertSnapshots<T>(snaps) {
    return <T[]>snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        ...snap.payload.doc.data()
      };
    });

  }

  updateBookById(idAuthor,book: BookModel) {
    return this.afs.collection('authors').doc(idAuthor).collection('books').doc(book.id).set(JSON.parse(JSON.stringify(book)));
  }

  deleteBook(idAuthor: string,idBook: string){

    return this.afs.collection('authors').doc(idAuthor).collection('books').doc(idBook).delete();
}

}
