import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientBook';
  heroIsHidden = false;


  constructor(
    private router: Router
  ){}

  ngOnInit(){
    this.router.events.subscribe(
      (event) => {
        if(event instanceof NavigationEnd){
          if(event.url.match('/user') || event.url.match('/admin')){
            this.heroIsHidden = true;
          }
          else{
            this.heroIsHidden = false;
          }
        }
      }
    )
  }


}
