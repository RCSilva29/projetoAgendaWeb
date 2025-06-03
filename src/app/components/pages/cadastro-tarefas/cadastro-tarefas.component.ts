import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {

  // atributos da classe
  categorias : any[] = []; // array de objetos vazio

  //injecao de dependencia do HttpClient
  http = inject(HttpClient);

  //funcao executada quando o componente é inicializado
  ngOnInit() {
    //faz uma requisicao HTTP GET para consultar as categorias
    this.http.get('http://localhost:8081/api/v1/categorias')
      .subscribe((response) => { // capturando a resposta da API
        // armazenarndo a resposta obtida da API no atributo da classe
        this.categorias = response as any[];
      })
  }
}
