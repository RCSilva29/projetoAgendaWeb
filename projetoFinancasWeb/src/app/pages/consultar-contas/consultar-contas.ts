import { Component, inject, signal } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consultar-contas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './consultar-contas.html',
  styleUrl: './consultar-contas.css'
})
export class ConsultarContas {

  //Atributos
  mensagem = signal('');
  contas = signal<any[]>([]);

  //Injeção de Dependências
  http = inject(HttpClient);

  //Estrutura de formulário
  form = new FormGroup({
    dataMin : new FormControl('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required])
  });

  //Função capturar o submit do formulário
  onSubmit() {

    //Capturar os valores do formulário
    const dataMin = this.form.get('dataMin')?.value;
    const dataMax = this.form.get('dataMax')?.value;

    //Fazendo uma requisição HTTP para obter as contas
    this.http.get<any[]>(environment.apiFinancas + '/contas/' + dataMin + '/' + dataMax)
      .subscribe((response) => { //Capturar a resposta da requisição
        this.contas.set(response); //Armazenando as contas obtidas
      });
  }

  //Função para excluir uma conta selecionada
  onDelete(id : string) {

    if(confirm('Deseja excluir a conta selecionada?')) {
      //Executando a requisição HTTP para excluir a conta
      this.http.delete(environment.apiFinancas + '/contas/' + id)
        .subscribe((response: any) => {
          this.mensagem.set(`Conta ${response.nome}, excluída com sucesso!`);
          this.onSubmit(); //Atualizando a lista de contas
        });
    }
  }
}
