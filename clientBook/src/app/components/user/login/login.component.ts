import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = {
    email: '',
    password: ''
  }
  hasError: boolean = false;
  errorMessage: string = "Verifica tus credenciales";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(formLogin: NgForm){
    if(formLogin.valid){
      this.hasError = false;
      this.authService.loginUser(this.user).subscribe(
        (data) => {
          this.authService.setUser(data.user);
          this.authService.setToken(data.id);
          this.router.navigate(['/user/profile']);
        },
        () => {
          this.showError();
        }
      )
    }
    else{
      this.showError();
    }
  }

  showError(){
    this.hasError = true; 
      setTimeout( () => {
        this.hasError = false;
      }, 5000)
      console.log('Error iniciando sesión');
  }

}
