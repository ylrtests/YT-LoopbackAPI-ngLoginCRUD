import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
  ) { }

  private books: Book[];

  ngOnInit() {
   this.getOffers();
  }

  getOffers(){
    this.dataApi.getOffers().subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    )
  }

}
