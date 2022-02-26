import {Component, Input} from "@angular/core";
import {CanDeactivateComponent} from "../../../core/components/can-deactivate.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {AttemptsService} from "../../../bounded-contexts/game/services/attempts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'right-side-bar-component',
  templateUrl: './right-side-bar-component.html',
})

export class RightSideBar extends CanDeactivateComponent {

  constructor(protected attemptsService: AttemptsService, protected router: Router) {
    super(router, attemptsService);
  }

  @Input() scene: any;

  getEmailUsuario() {
    const user: string = localStorage.getItem("user") + "";
    return JSON.parse(user).email;
  }
}
