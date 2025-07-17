import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastrar-contas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './cadastrar-contas.html',
  styleUrl: './cadastrar-contas.css'
})
export class CadastrarContas {

  //Atributos do componente
  mensagem = signal('');

  //Injeções de dependências
  http = inject(HttpClient);

  //Estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    data : new FormControl('', [Validators.required]),
    valor : new FormControl('', [Validators.required]),
    tipo : new FormControl('', [Validators.required])
  })

  //função para enviar o formulário para a API
  onSubmit() {
    //enviando uma requisição POST para a API de finanças
    this.http.post(environment.apiFinancas + '/contas', this.form.value)
      .subscribe((response: any) => { //captura a resposta da API
        this.mensagem.set(`Conta ${response.nome} cadastrada com sucesso!`);
        this.form.reset(); //limpa o formulário após o envio
      });
  }
}
