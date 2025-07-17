import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  //Atributos
  nomeUsuario = signal('');
  emailUsuario = signal('');

  //Injeção de dependência
  router = inject(Router);

  //Função executada ao iniciar o componente
  ngOnInit() {
    //Capturar os dados do usuário logado (contidos na sessionStorage)
    const auth = sessionStorage.getItem('auth');
    const usuario = JSON.parse(auth as string);

    //Ler o nome e o email do usuário
    this.nomeUsuario.set(usuario.nome);
    this.emailUsuario.set(usuario.email);
  }

  //Função para realizar o logout do usuário
  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      sessionStorage.removeItem('auth'); //Remover os dados do usuário logado
      this.router.navigate(['/autenticar']); //Redirecionar para a página de autenticação
    }
  }
}
