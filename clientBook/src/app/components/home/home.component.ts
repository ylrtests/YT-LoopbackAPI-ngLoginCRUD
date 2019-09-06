import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';


import { Book } from '../../models/Book';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataApi: DataApiService
    ) {}

  private books: Book[];

  ngOnInit() {
    this.getListBooks();
  }

  getListBooks(){
    
    this.dataApi.getAllBooks().subscribe( 
      (books: Book[]) => {
        this.books = books;
      },
      (err) =>{
        console.log(">>Error getting getAllBooks<<")
        console.log(err)
      })
  }

}
