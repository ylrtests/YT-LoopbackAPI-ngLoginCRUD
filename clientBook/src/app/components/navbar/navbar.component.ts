import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


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

  private isLoggedIn: boolean;


  ngOnInit() {
    this.onCheckUser();

    let subscriberLoggedUser = this.authService.isLoggedIn.subscribe(value => {
      console.log("Subscription got", value);
      this.isLoggedIn = value;
    });

  }

  onLogout() {
    this.authService.logoutUser().subscribe(
      (res) => {
        console.log("Logout...")
      }
    )
  }

  onCheckUser(): void {
    this.authService.getCurrentUser()
  }

}
