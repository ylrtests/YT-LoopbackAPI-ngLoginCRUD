import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  public appName = "Books Store";
  isLogged: boolean = false;

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(){
    this.authService.logoutUser().subscribe(
      (res) => {
        console.log("Logout...")
      }
    )
  }

  onCheckUser ():void{
    if(this.authService.getCurrentUser() === null) {
      this.isLogged = false
    }
    else{
      this.isLogged = true;
    }
  }

}
