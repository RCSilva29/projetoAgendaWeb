import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

  //atributos
  tarefas: any[] = []; //array de objetos
  tarefaSelecionada: any; //objeto que armazena a tarefa selecionada

  //injecoes de dependencia
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  //estrutura de formulario
  form = this.fb.group({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required])
  });

  //funcao para capturar o submit do formulario
  onSubmit() {
    // guardando os falores do formulario em variaveis
    const dataMin = this.form.value.dataMin;
    const dataMax = this.form.value.dataMax;

    //fazendo uma requisicao HTTP GET para a API
    this.http.get(environment.apiTarefas + '/tarefas/' + dataMin + '/' + dataMax)
      .subscribe((response) => { //aguardando a resposta da API
        //armazenando os dados obtidos da API
        this.tarefas = response as any[];
      });
  }

  //funcao para capturar os dados da tarefa selecionada
  onConfirm(tarefa: any) {
    this.tarefaSelecionada = tarefa; //armazenando a tarefa selecionada
  }

  //funcao para realizar a exclusao da tarefa selecionada
  onDelete() {
    //fazendo uma requisicao HTTP DELETE para a API
    this.http.delete(environment.apiTarefas + '/tarefas/' + this.tarefaSelecionada.id)
      .subscribe(() => { //aguardando a resposta da API
        //removendo a tarefa selecionada do array de tarefas
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== this.tarefaSelecionada.id);
        this.tarefaSelecionada = null; //limpando a tarefa selecionada
      });
  }
}
