import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(){
    if(this.authService.getCurrentUser()){
      this.router.navigate(['/user/profile']);
      return false;
    }
    else{
      return true;
    }
  }
  
  
}
