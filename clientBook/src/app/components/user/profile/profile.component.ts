import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

    user: User;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log(this.user)
  }

}
