import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User = {
    name: '',
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

  onRegister(formRegister: NgForm): void {
    if (formRegister.valid) {
      this.authService.registerUser(this.user).subscribe(
        () => {
          this.authService.loginUser(this.user).subscribe(
            (data) => {
              let token = data.id;
              this.authService.setToken(token);
              this.authService.setUser(data.user);
              this.router.navigate(['/user/profile']);
            },
            (err) => {//Error loginUser
              this.showError();
              console.log(err)
              this.errorMessage = err;
            }
          )
        },
        (err) => { //Error registerUser
          let objectKey = Object.keys(err.error.error.details.messages)[0]
          let message = err.error.error.details.messages[objectKey][0];
          
          this.errorMessage = message;
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
