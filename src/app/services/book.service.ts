import { map } from 'rxjs/operators';
import { BookModel } from './../models/book.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthorModel } from '../models/author.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookCollection: AngularFirestoreCollection<BookModel>;
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
