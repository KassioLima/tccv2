import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ScenePhaseOne} from "../../model/scenePhaseOne.model";
import {Router} from "@angular/router";
import {CanDeactivateComponent} from "../../../../core/components/can-deactivate.component";

declare let $: any;

@Component({
  selector: 'app-phase-one-component',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss']
})
export class PhaseOneComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('modalRank', { static: false }) modalRank!: TemplateRef<any>
  modalRankRef!: BsModalRef;

  @ViewChild('gameArea', { static: false }) gameArea!: ElementRef;

  formRankSubmitted: boolean = false;

  formRank = new FormGroup({});

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;

  constructor(private router: Router, private spinner: NgxSpinnerService, private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.scene = new ScenePhaseOne(this.config, null, null);
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
      width: 700,
      height: 600,
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

    this.config.scene = this.scene;
    this.game = new Phaser.Game(this.config);
  }

}
