import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;
  loginForm = this.formBuilder.group({
    //Para login em conta existente
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  signupForm = this.formBuilder.group({
    //Para criar uma conta
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService //Biblioteca externa ngx-cookie-service
  ) {}

  //Para login em conta existente
  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            //Após autenticar o login, guarda o token JWT recebido na response em um cookie:
            this.cookieService.set('USER_INFO', response?.token);//Guardar o token nos cookies
            console.log('Login efetuado com sucesso');
            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  //Para criar uma conta
  onSubmitSignupForm(): void {
    //Value é se o formulário possui algum valor e Valid é caso tenha preenchido os campos
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Usuário teste criado com sucesso');
              this.signupForm.reset(); //Para limpar todos os campos do form após o envio
              this.loginCard = true; //Para redirecionar ao form de login após criar o user
            }
          },
          error: (err) => console.log(err),
        });
    }
  }
}
