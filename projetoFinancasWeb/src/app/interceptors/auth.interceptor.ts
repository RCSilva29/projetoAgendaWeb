import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

    //Capturando os dados do usuário logado
    const auth = sessionStorage.getItem('auth');

    //Verifica se o usuário está logado e se a URL da requisição é para a API de Finanças
    if (auth && req.url.includes(environment.apiFinancas)) {

        //Ler o token do usuário logado
        const accessToken = JSON.parse(auth).accessToken;

        //Enviando o token no header da requisição
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        //Enviando a requisição clonada com o token
        return next(cloned);
    }

    return next(req);
}