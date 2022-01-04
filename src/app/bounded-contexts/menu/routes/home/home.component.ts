import { Component, OnInit } from '@angular/core';
import Phaser from "phaser";
import {SchedulingService} from "../../../backoffice/services/scheduling/scheduling.service";
import {SchedulingTypeService} from "../../../backoffice/services/scheduling/scheduling-type.service";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalService} from "ngx-bootstrap/modal";
import {SceneMenu} from "../../../backoffice/domain/models/sceneMenu.model";
import * as moment from "moment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: Phaser.Types.Core.GameConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    audio: {
      disableWebAudio: true
    },
    transparent: true
  };

  game: Phaser.Game;

  constructor(private schedulingService: SchedulingService, private schedulingTypeService: SchedulingTypeService, private spinner: NgxSpinnerService, private modalService: BsModalService) {

    this.config.scene = new SceneMenu(this.config, null, null);
    this.game = new Phaser.Game(this.config);
  }

  ngOnInit(): void {
    moment.locale('pt-br');
  }

  startGame() {
    alert('começando jogo')
  }

}
