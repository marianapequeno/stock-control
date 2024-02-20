import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss'],
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) {}


  //Fazer logout do sistema
  handleLogout(): void {
    this.cookie.delete('USER_INFO'); //Deleta o token JWT dos cookies
    void this.router.navigate(['/home']); //Redireciona para a tela de login, a rota '/home'
  }


}
