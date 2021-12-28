import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { SchedulingTypeService } from "../../../services/scheduling/scheduling-type.service";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {SchedulingService} from "../../../services/scheduling/scheduling.service";
import {Element} from "@angular/compiler";
import Phaser from 'phaser';
import {Game} from "phaser";
import { MyScene } from "../../../domain/models/myScene.model"
import { SceneMenu } from "../../../domain/models/sceneMenu.model"

@Component({
  selector: 'app-scheduling-list',
  templateUrl: './scheduling-list.component.html',
  styleUrls: ['./scheduling-list.component.css'],
})

export class SchedulingListComponent implements OnInit {

  config: Phaser.Types.Core.GameConfig = {
      width: 1310,
      height: 667,
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
      }
    };

  game: Phaser.Game;

  constructor(private schedulingService: SchedulingService, private schedulingTypeService: SchedulingTypeService, private spinner: NgxSpinnerService, private modalService: BsModalService) {

    this.config.scene = new SceneMenu(this.config, null, null);
    this.game = new Phaser.Game(this.config);
  }

  ngOnInit(): void {
    moment.locale('pt-br');
  }
}
