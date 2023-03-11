import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IConnectRoom, ICreateRoom, IRoom, IRoomResponse} from "../interfaces/room.interface";
import {IAccessToken} from "../interfaces/token.interface";
import {ILogin, ILoginSuccess, IRegistrations} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  private doGetRequest<T>(action: string = ''): Observable<T>{
    return this.http.get<T>(this.apiUrl + action, {});
  }

  private doPostRequest<T>(action: string = '', params: any = {}): Observable<T>{
    return this.http.post<T>(this.apiUrl + action, params);
  }

  getAllRoom(){
    return this.doGetRequest<IRoomResponse[]>('room');
  }

  createRoom(params: ICreateRoom){
    return this.doPostRequest<IRoom>('room', params);
  }

  connectRoom(params: IConnectRoom){
    return this.doPostRequest<boolean>('room/connect', params);
  }

  checkToken(params: IAccessToken){
    return this.doPostRequest<boolean>('auth/checkToken', params);
  }

  login(params: ILogin) {
    return this.doPostRequest<ILoginSuccess>('auth/login', params);
  }

  registration(params: IRegistrations) {
    return this.doPostRequest<boolean>('auth/registration', params)
  }
}
