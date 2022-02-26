import {Component, Input} from "@angular/core";
import {CanDeactivateComponent} from "../../../core/components/can-deactivate.component";

@Component({
  selector: 'right-side-bar-component',
  templateUrl: './right-side-bar-component.html',
})

export class RightSideBar extends CanDeactivateComponent {
  @Input() scene: any;

  getEmailUsuario() {
    return localStorage.getItem("userEmail");
  }
}
