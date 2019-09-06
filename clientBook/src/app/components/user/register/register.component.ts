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
      () => {
        this.authService.loginUser(this.user).subscribe(
          (data) => {
            let token = data.id;
            this.authService.setToken(token);
            this.authService.setUser(data.user);
            this.router.navigate(['/user/profile']);
          },
          (err) => {
            console.log("Error iniciando sesión usuario.")
          }
        )
      },
      (err) => {
        console.log("Error registrando usuario.")
      }
    )
  }

}
