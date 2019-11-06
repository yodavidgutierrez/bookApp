import { Injectable } from '@angular/core';
import { AuthorModel } from '../../models/author.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authsCollection: AngularFirestoreCollection<AuthorModel>;
  auths: Observable<AuthorModel[]>;
  constructor(private afs: AngularFirestore) {
    this.authsCollection = this.afs.collection<AuthorModel>('authors');
  }

  createAuthor(author: AuthorModel) {
    return this.authsCollection.add(JSON.parse(JSON.stringify(author)));
  }

  getAuthor(id: string): Observable<AuthorModel> {
    const authorsDocuments = this.afs.doc<AuthorModel>('authors/' + id);
    return authorsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  getAllAuthors() {
    return this.authsCollection.snapshotChanges();
  }

  updateAuthorById(author: AuthorModel) {
    return this.afs.doc('authors/'+author.id).set(JSON.parse(JSON.stringify(author)));
  }

  deleteAuthor(id: string){
    const authorsDocuments = this.afs.doc<AuthorModel>('authors/' + id).delete();
    return authorsDocuments;
}
}
