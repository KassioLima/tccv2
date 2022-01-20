import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnComponentDeactivate {
  stopSound: () => Observable<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<OnComponentDeactivate> {
  constructor() {}

  canDeactivate(
    component: OnComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return component.stopSound();
  }
}
