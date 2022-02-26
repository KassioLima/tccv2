import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {NgxSpinnerService} from "ngx-spinner";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SceneMenu} from "../../model/sceneMenu.model";
import {Router} from "@angular/router";
import {CanDeactivateComponent} from "../../../../core/components/can-deactivate.component";
import {UserService} from "../../services/menu/user.service";
import Swal from "sweetalert2";
import {User} from "../../model/user.model";
import {AttemptsService} from "../../../game/services/attempts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('modalCreateUser', { static: false }) modalCreateUser!: TemplateRef<any>
  modalCreateUserRef!: BsModalRef;

  @ViewChild('modalLogin', { static: false }) modalLogin!: TemplateRef<any>
  modalLoginRef!: BsModalRef;

  @ViewChild('gameArea', { static: false }) gameArea!: ElementRef;

  formCreateUserSubmitted: boolean = false;
  formLoginSubmitted: boolean = false;

  formCreateUser = new FormGroup({});
  formLogin = new FormGroup({});

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;

  emailToCreate!: string;

  constructor(protected router: Router, protected attemptsService: AttemptsService, private spinner: NgxSpinnerService, private modalService: BsModalService, private userService: UserService) {
    super(router, attemptsService);
  }

  ngOnInit(): void {
    moment.locale('pt-br');
    this.scene = new SceneMenu(this.config, null, null);
    localStorage.removeItem("user");
  }

  startGame() {
    this.openModalLogin();
    this.scene.emitSoundClick();
  }

  openModalCreateUser() {
    this.initCreateUserForm();
    this.modalCreateUserRef = this.modalService.show(this.modalCreateUser);
    this.modalCreateUserRef.setClass('modal-dialog-centered modal-dialog-scrollable');
  }

  closeModalCreateUser() {
    this.modalCreateUserRef.hide();
  }

  openModalLogin() {
    this.initLoginForm();
    this.modalLoginRef = this.modalService.show(this.modalLogin);
    this.modalLoginRef.setClass('modal-dialog-centered modal-dialog-scrollable');
  }

  closeModalLogin() {
    this.modalLoginRef.hide();
  }

  initCreateUserForm() {
    this.formCreateUserSubmitted = false;
    this.formCreateUser = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(6)]),
      email: new FormControl({value: this.emailToCreate, disabled: true}, Validators.required),
    });
  }

  initLoginForm() {
    this.formLoginSubmitted = false;
    this.formLogin = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  save() {
    this.formCreateUserSubmitted = true;

    if (this.formCreateUser.invalid) return;

    this.spinner.show();
    let user = new User();

    Object.assign(user, this.formCreateUser.value);
    user.email = this.emailToCreate;

    this.userService.create(user).subscribe((response) => {
      setTimeout(() => {
        this.spinner.hide();
        this.closeModalCreateUser();
        localStorage.setItem("user", JSON.stringify({email: response.email, id: response.id}));
        this.router.navigate(['game']);
      }, 2000);
    },
      (error) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Oops!...',
          text: error.error.message || error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      });

  }

  ngAfterViewInit(): void {
    this.config = {
      width: window.innerWidth,
      height: window.innerHeight,
      type: Phaser.AUTO,
      parent: this.gameArea.nativeElement,
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
    },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      audio: {
        disableWebAudio: true,
      },
      transparent: true
    };
    this.config.scene = this.scene;
    this.game = new Phaser.Game(this.config);
  }

  async tryLogin() {
    this.formLoginSubmitted = true;

    if(this.formLogin.valid) {
      const email = this.formLogin.get("email")?.value;
        this.spinner.show();
        await this.userService.readByEmail(email).subscribe((response) => {
          setTimeout(() => {
            this.spinner.hide();
            if (response) {
              this.closeModalLogin();
              localStorage.setItem("user", JSON.stringify({email: response.email, id: response.id}));
              this.router.navigate(['game']);
            }
            else {
              this.emailToCreate = email;
              this.closeModalLogin();
              this.openModalCreateUser();
            }
          }, 2000);
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Oops!...',
            text: error.error.message || error.message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        });


      // this.closeModalCreateUser();
      // this.router.navigate(['game']);
    }
  }
}
