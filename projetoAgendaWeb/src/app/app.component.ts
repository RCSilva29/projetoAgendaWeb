import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CadastroTarefasComponent } from './components/pages/cadastro-tarefas/cadastro-tarefas.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent, // importando o componente Navbar
    CadastroTarefasComponent // importando o componente CadastroTarefas
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetoAgendaWeb';
}
