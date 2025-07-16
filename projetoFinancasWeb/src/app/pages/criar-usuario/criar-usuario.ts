import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {

    //Atributos
    mensagemSucesso = signal('');
    mensagemErro = signal('');

    //injeção de dependência para inicializar HttpClient
    http = inject(HttpClient);

    //criando a estrutura do formulário
    form = new FormGroup({
      nome : new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(100)
      ]),
      email : new FormControl('', [
        Validators.required, Validators.email
      ]),
      senha : new FormControl('', [
        Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]),
      senhaConfirmacao : new FormControl('', [
        Validators.required
      ])
    });

    //função para capturar o evento de submit do formulário
    onSubmit() {

      //limpar as mensagens de sucesso e de erro
      this.mensagemSucesso.set('')
      this.mensagemErro.set('');

      //comparar se as senhas digitadas são iguais
      if(this.form.value.senha != this.form.value.senhaConfirmacao) {
        this.mensagemErro.set('Senhas não conferem, por favor verifique.');
        return;
      }

      //enviando uma requisição para o serviço de cadastro de usuários da API
      this.http.post(`${environment.apiUsuarios}/usuario/criar`, this.form.value)
        .subscribe({ //aguardando o retorno da API
          next: (response: any) => { //capturando a resposta de sucesso
            this.mensagemSucesso.set(`Parabéns ${response.nome}, sua conta foi criada com sucesso!`);
            this.form.reset(); //limpar os campos do formulário
          },
          error: (e: any) => { //capturando a resposta de erro
            this.mensagemErro.set(e.error.erro);
          }
        })

    }
}
