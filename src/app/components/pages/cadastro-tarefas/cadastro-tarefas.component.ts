import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {

  // atributos da classe
  categorias: any[] = []; // array de objetos vazio
  mensagem : string = ''; // string de texto vazia

  //injecoes de dependencia
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  //estrutura do formulario
  form = this.fb.group({
    titulo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    finalizado: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required])
  });

  //funcao executada quando o componente é inicializado
  ngOnInit() {
    //faz uma requisicao HTTP GET para consultar as categorias
    this.http.get(environment.apiTarefas + '/categorias')
      .subscribe((response) => { // capturando a resposta da API
        // armazenarndo a resposta obtida da API no atributo da classe
        this.categorias = response as any[];
      })
  }

  //funcao executada quando o usuario clica no botao submit do formulario
  onSubmit() {
    //enviando uma requisicao HTTP POST para a API
    this.http.post(environment.apiTarefas + '/tarefas', this.form.value)
    .subscribe((response: any) => {//capturando a resposta da API
      // exibindo uma mensagem de sucesso
      this.mensagem = `Tarefa: ${response.titulo}, cadastrada com sucesso!`;
      this.form.reset(); // limpando os campos do formulario
    });
  }
}
