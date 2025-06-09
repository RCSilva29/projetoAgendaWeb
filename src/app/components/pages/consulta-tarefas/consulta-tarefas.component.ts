import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

  //atributos
  tarefas: any[] = []; //array de objetos

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
}
