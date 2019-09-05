import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private user: User = {
    name: '',
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  onRegister(): void {
    this.authService.registerUser(this.user).subscribe(
      (res) => {
        console.log(">>Response register: ")
        console.log(res)
        this.authService.loginUser(this.user).subscribe(
          (data) => {
            console.log(">>Response login: ");
            console.log(data);
            let token = data.id;
            this.authService.setToken(token);
            this.authService.setUser(data.user);
            this.router.navigate(['/user/profile']);
          }
        )
      }
    )
  }

}
