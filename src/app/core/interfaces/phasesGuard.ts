import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable()
export class PhasesGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const urlTree = this.router.parseUrl('/');

    return !!localStorage.getItem("user") ? true : urlTree;
  }
}
