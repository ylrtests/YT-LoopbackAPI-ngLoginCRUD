import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  onLogout(){
    this.authService.logoutUser().subscribe(
      (res) => {
        console.log("Logout...")
        console.log(res)
      }
    )
  }

}
