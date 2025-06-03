import { Routes } from '@angular/router';
import { CadastroTarefasComponent } from './components/pages/cadastro-tarefas/cadastro-tarefas.component';
import { ConsultaTarefasComponent } from './components/pages/consulta-tarefas/consulta-tarefas.component';
import { EdicaoTarefasComponent } from './components/pages/edicao-tarefas/edicao-tarefas.component';

// Mapeamento das rotas de navegacao do projeto
export const routes: Routes = [
    {
        path: 'pages/cadastro-tarefas', // rota de navegacao
        component: CadastroTarefasComponent, // componente        
    },
    {
        path: 'pages/consulta-tarefas', // rota de navegacao
        component: ConsultaTarefasComponent // componente
    },
    {
        path: 'pages/edicao-tarefas', // rota de navegacao
        component: EdicaoTarefasComponent // componente
    }
];
