import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HandleService} from "./handle.service";
import {ILogin, ILoginSuccess, IRegistrations} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private _authorize = false;

  constructor(private apiService: ApiService, private handleService: HandleService)  {
    // тут переписать, чтобы токен проверялся с бэка
    this.checkToken();
  }

  get authorize(){
    return this._authorize;
  }

  get token(): string | null{
    return localStorage.getItem('token');
  }

  get loginName(): string | null {
    return localStorage.getItem('login');
  }

  private set authorize(param: boolean) {
    this._authorize = param;
  }

  checkToken() {
    if (this.loginName && this.token) {
      this.apiService.checkToken({
        login: this.loginName,
        token: this.token,
      }).subscribe((data) => {
        this.authorize = data;
      }, (error: Error) => {
        this.handleService.handleError(error);
      });
    } else {
      this.authorize = false;
    }
    // this.authorize = Boolean(localStorage.getItem('token'));
  }

  login(params: ILogin){
    this.apiService.login(params).subscribe((data: ILoginSuccess) => {
      this.authorize = true;
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('login', params.login);
    }, (error: Error) => {
      this.handleService.handleError(error);
    });
  }

  registration(params: IRegistrations) {
    this.apiService.registration(params).subscribe((data) => {
      if (data) {
        alert('Регистрация успешна');
      } else {
        this.handleService.handleError(new Error('Ошибка регистрации'));
      }
    }, (error: Error) => {
      this.handleService.handleError(error);
    })
  }

  // реализация потом
  logout(){
    this.authorize = false;
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }
}
