import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizationGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authorizationService.authorize) {
      alert('Нет доступа, авторизуйтесь')
      this.router.navigateByUrl('');
    }
    return this.authorizationService.authorize;
  }

}
