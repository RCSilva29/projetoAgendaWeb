import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    // Recupera o registro de usuário autenticado do sessionStorage
    const authData = sessionStorage.getItem('auth');

    //Verifica se existe um registro de usuário 
    //autenticado gravado no sessionStorage
    if (!authData) {
      this.router.navigate(['/autenticar']);
      return false;
    }

    try {
      const user = JSON.parse(authData);

      // Verifica se o token existe
      if (!user.accessToken) {
        this.router.navigate(['/autenticar']);
        return false;
      }

      // Verifica se o token expirou
      const now = new Date();
      const expiration = new Date(user.dataHoraExpiracao);
      if (expiration <= now) {
        this.router.navigate(['/autenticar']);
        return false;
      }

      return true; // Está autenticado e com token válido
      
    } catch (error) {
      this.router.navigate(['/autenticar']);
      return false;
    }
  }
}
