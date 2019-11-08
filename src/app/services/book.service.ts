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

  getBook(id: string): Observable<BookModel> {
    const booksDocuments = this.afs.doc<BookModel>('books/' + id);
    return booksDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

 //me traer un arreglo con los autores y adentro otro arreglo con los libros como objetos !!importante se necesita al reves
  /*getAllBook<T extends BookModel>( ) {
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

  }*/

   /* getAllBook() {
     return this.afs.collection('authors').get().subscribe((series: any) => series.forEach(item => {
      this.afs.collection('authors').doc(item.id).collection('books')
      .snapshotChanges().pipe(map(items => {
        console.log(items);
          return items.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const serId = item.id;
          return Object.assign({ id, serId, ...data });

      });
    }
    ));
  }));

}*/
getAllBook() {
}

  updateBookById(book: BookModel) {
    return this.afs.doc('books/'+book.id).set(JSON.parse(JSON.stringify(book)));
  }

  deleteBook(id: string){
    const booksDocuments = this.afs.doc<BookModel>('books/' + id).delete();
    return booksDocuments;
}

}
