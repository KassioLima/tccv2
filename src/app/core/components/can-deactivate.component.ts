import {Observable} from "rxjs";
import {OnComponentDeactivate} from "../interfaces/guard";

export class CanDeactivateComponent implements OnComponentDeactivate {
  scene: any;
  stopSound(): Observable<boolean> | boolean {
    this.scene.sound.stopAll();
    return true;
  }
}
