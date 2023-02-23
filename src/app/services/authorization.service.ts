import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private _authorize = false;

  constructor()  {
    // тут переписать, чтобы токен проверялся с бэка
    this.checkToken();
  }

  get authorize(){
    return this._authorize;
  }

  get token(): string | null{
    return localStorage.getItem('token');
  }

  private set authorize(param: boolean) {
    this._authorize = param;
  }

  checkToken() {
    this.authorize = Boolean(localStorage.getItem('token'));
  }

  // реализация потом
  login(){

  }

  // реализация потом
  logout(){

  }
}
