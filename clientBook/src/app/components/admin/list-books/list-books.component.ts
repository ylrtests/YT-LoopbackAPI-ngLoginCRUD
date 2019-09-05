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

  books: Book[]

  ngOnInit() {
    this.getListBooks()
  }

  getListBooks(): void{
    this.dataService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        console.log("GetAllBooks..")
        console.log(this.books)
      }
    )
  }

  onUpdateBook(){

  }
  onDeleteBook(id:string): void{
    if(confirm("Are you sure to delete this book?")){
      this.dataService.deleteBook(id).subscribe(
        (res) => {
          console.log("Book has been deleted");
          console.log(res)
          this.getListBooks()
        }
      )
    }
  }

}
