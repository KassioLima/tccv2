import {Observable} from "rxjs";
import {OnComponentDeactivate} from "../interfaces/guard";
declare let $: any

export class CanDeactivateComponent implements OnComponentDeactivate {
  scene: any;

  volumePrincipal = localStorage.getItem('volumePrincipal') ? Number(localStorage.getItem('volumePrincipal')) : 20;
  efeitosSonoros = localStorage.getItem('efeitosSonoros') ? Number(localStorage.getItem('efeitosSonoros')) : 100;

  abrirMenuLateral() {
    $("#content-right-side-bar").addClass("show");
    $("#content-right-side-bar .fundo").addClass("show");
    $("#content-right-side-bar .menu").addClass("show");
  }

  fecharMenuLateral() {
    $("#content-right-side-bar .fundo").removeClass("show");
    $("#content-right-side-bar .menu").removeClass("show");
    setTimeout(() => {
      $("#content-right-side-bar").removeClass("show");
    }, 500);
  }

  changeVolumePrincipal() {
    localStorage.setItem("volumePrincipal", "" + this.volumePrincipal);
    this.scene.musicVolume = this.volumePrincipal / 100;
    this.scene?.music?.setVolume(this.volumePrincipal / 100);
  }

  changeEfeitosSonoros() {
    localStorage.setItem("efeitosSonoros", "" + this.efeitosSonoros);
    this.scene.sfxVolume = this.efeitosSonoros / 100;
    this.scene?.passos?.setVolume(this.efeitosSonoros / 100);
  }

  stopSound(): Observable<boolean> | boolean {
    this.scene.sound.stopAll();
    return true;
  }
}
