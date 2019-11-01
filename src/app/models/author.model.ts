export class AuthorModel {
  id:string;
  nombre: string;
  apellido: String;
  vivo: boolean;

  constructor(){
    this.vivo = true;
  }
}
