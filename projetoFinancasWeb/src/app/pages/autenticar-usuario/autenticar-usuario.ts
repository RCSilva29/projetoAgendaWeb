import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  //Atributos
  mensagemErro = signal('');

  //Injeção de dependência
  http = inject(HttpClient);
  router = inject(Router);

  //Estrutura de formulário
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //Função para capturar o SUBMIT do formulário
  onSubmit() {

    this.mensagemErro.set('');

    this.http.post(`${environment.apiUsuarios}/usuario/autenticar`, this.form.value)
      .subscribe({
        next: (response) => {
          //gravar os dados do usuário autenticado
          sessionStorage.setItem('auth', JSON.stringify(response));
          //redireciona para a página de consulta de contas
          this.router.navigate(['/consultar-contas']);
        },
        error: (e) => {
          this.mensagemErro.set(e.error.erro);
        }
      })
  }

}
