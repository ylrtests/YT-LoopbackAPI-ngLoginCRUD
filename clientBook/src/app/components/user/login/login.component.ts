import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private user: User = {
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  onLogin(){
    this.authService.loginUser(this.user).subscribe(
      (data) => {
        this.authService.setUser(data.user);
        this.authService.setToken(data.id);
        this.router.navigate(['/user/profile']);
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
