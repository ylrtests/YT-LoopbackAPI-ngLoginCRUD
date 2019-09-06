import { Component, OnInit, Input } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Book } from 'src/app/models/Book';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() selectedBook: Book;

  constructor(
    private dataService: DataApiService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void{
    if(this.selectedBook.id){
      // ACTUALIZAR LIBRO
      this.dataService.updateBook(bookForm.value, this.selectedBook.id).subscribe(
        () => {
          location.reload();
        },
        (err) => {
          console.log("Error actualizando book: "+err)
        }
      )
    }
    else{
      // CREAR LIBRO
      this.dataService.saveBook(bookForm.value).subscribe(
        () => {
          location.reload();
        },
        (err) => {
          console.log("Error actualizando book: "+err)
        }
      )
    }

  }

}
