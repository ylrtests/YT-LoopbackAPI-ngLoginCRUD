import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(
    private dataService: DataApiService
  ) { }

  books: Book[];
  selectedBook: Book;

  ngOnInit() {
    this.getListBooks();
    this.selectedBook = {
      id: '',
      titulo: '',
      idioma: '',
      descripcion: '',
      portada: '',
      precio: '',
      link_amazon: '',
      autor: '',
      oferta: 0
    };
  }

  getListBooks(): void{
    this.dataService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    )
  }

  onUpdateBook(book: Book){
    this.selectedBook = {...book};
  }

  onCreateBook(){
    this.selectedBook = {
      id: '',
      titulo: '',
      idioma: '',
      descripcion: '',
      portada: '',
      precio: '',
      link_amazon: '',
      autor: '',
      oferta: 0
    }
  }
  onDeleteBook(id:string): void{
    if(confirm("¿Seguro quieres eliminar este libro?")){
      this.dataService.deleteBook(id).subscribe(
        (res) => {
          console.log("Libro eliminado");
          this.getListBooks();
        }
      )
    }
  }

}
