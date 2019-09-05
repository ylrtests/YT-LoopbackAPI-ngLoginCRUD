import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';

import { Book }  from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  URL_API: String = 'http://localhost:3000/api';
  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-Type": "application/json",
    "Authorization": this.authService.getToken()
  })

  books: Observable<any>;
  book: Observable<any>;

  getAllBooks(){
    //Retorna libros sin oferta, solo usuarios autenticados pueden ver con oferta.
    return this.http.get(`${this.URL_API}/books?filter[where][oferta]=0`);
  }

  getBookById(id: string){
    return (this.book = this.http.get(`${this.URL_API}/books/${id}`));
  }

  getOffers(){
    return (this.books = this.http.get(`${this.URL_API}/books?filter[where][oferta]=1`));
  }

  saveBook(book: Book){
    //TODO: Obtener token.
    //TODO: not null
    let token = this.authService.getToken();
    return this.http.post<Book>(`${this.URL_API}/books?access_token=${token}`,book, {headers: this.headers})
      .pipe(map( data => data));
  }

  updateBook(book: Book){
    //TODO: Obtener token.
    //TODO: not null
    let token = this.authService.getToken();
    return this.http.put<Book>(`${this.URL_API}/books?access_token=${token}`,book, {headers: this.headers})
      .pipe(map( data => data));
  }

  deleteBook(id: string){
    //TODO: Obtener token.
    //TODO: not null
    let token = this.authService.getToken();
    return this.http.delete<Book>(`${this.URL_API}/books/${id}?access_token=${token}`, {headers: this.headers})
      .pipe(map( data => data));
  }
}
