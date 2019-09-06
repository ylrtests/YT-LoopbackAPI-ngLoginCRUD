import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private route: ActivatedRoute
    ) {}

  private book: Book ={
    titulo : "",
    idioma : "",
    descripcion : "",
    portada : "",
    precio : "",
    link_amazon : "",
    autor : "",
    oferta: 0
  }

  private bookId : string;

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    this.getBookDetails(this.bookId);
  }

  getBookDetails(id: string){
    this.dataApi.getBookById(id).subscribe(
      (book: Book) => {
        this.book = book;
      }
    )
  }

}
