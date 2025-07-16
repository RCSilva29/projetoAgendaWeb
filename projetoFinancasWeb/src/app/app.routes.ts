import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './pages/criar-usuario/criar-usuario';
import { ConsultarContas } from './pages/consultar-contas/consultar-contas';
import { CadastrarContas } from './pages/cadastrar-contas/cadastrar-contas';
import { EditarContas } from './pages/editar-contas/editar-contas';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'autenticar', component: AutenticarUsuario
    },
    {
        path: 'criar-usuario', component: CriarUsuario
    },
    {
        path: 'consultar-contas', component: ConsultarContas, canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar-contas', component: CadastrarContas, canActivate: [AuthGuard]
    },
    {
        path: 'editar-contas', component: EditarContas, canActivate: [AuthGuard]
    },
    {
        path: '', pathMatch: 'full', redirectTo: '/autenticar'
    }
];
