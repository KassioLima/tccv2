import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SceneMenu} from "../../model/sceneMenu.model";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('modalRank', { static: false }) modalRank!: TemplateRef<any>
  modalRankRef!: BsModalRef;

  @ViewChild('gameArea', { static: false }) gameArea!: ElementRef;

  formRankSubmitted: boolean = false;

  formRank = new FormGroup({});

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;

  constructor(private router: Router, private spinner: NgxSpinnerService, private modalService: BsModalService) {}

  ngOnInit(): void {
    moment.locale('pt-br');
  }

  startGame() {
    this.openModalRank()
  }

  openModalRank() {
    this.initRankForm();
    this.modalRankRef = this.modalService.show(this.modalRank);
    this.modalRankRef.setClass('modal-dialog-centered modal-dialog-scrollable');
  }

  closeModalRank() {
    this.modalRankRef.hide();
  }

  initRankForm() {
    this.formRankSubmitted = false;
    this.formRank = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(6)]),
      email: new FormControl(null, Validators.required),
    });
  }

  enter() {
    this.formRankSubmitted = true;

    if(this.formRank.valid) {
      this.closeModalRank();
      this.router.navigate(['game']);
    }
  }

  ngAfterViewInit(): void {
    this.config = {
      width: window.innerWidth,
      height: window.innerHeight,
      type: Phaser.AUTO,
      parent: this.gameArea.nativeElement,
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
    this.config.scene = new SceneMenu(this.config, null, null);
    this.game = new Phaser.Game(this.config);
  }

}
