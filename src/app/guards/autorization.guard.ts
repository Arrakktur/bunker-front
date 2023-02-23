import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizationGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authorizationService.authorize) {
      alert('Нет доступа, авторизуйтесь')
    }
    return this.authorizationService.authorize;
  }

}
