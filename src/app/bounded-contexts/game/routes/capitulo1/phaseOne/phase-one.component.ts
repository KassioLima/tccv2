import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {ScenePhaseOne} from "../../../model/scenePhaseOne.model";
import {CanDeactivateComponent} from "../../../../../core/components/can-deactivate.component";
import {AceEditorComponent} from "ng2-ace-editor";
import Swal from "sweetalert2";
import {LineCodeModel} from "../../../model/line-code.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {EndGameInformations} from "../../../model/end-game.informations";
import {Router} from "@angular/router";
import {AttemptsService} from "../../../services/attempts.service";
import {User} from "../../../../menu/model/user.model";
declare const ace: any;

@Component({
  selector: 'app-phase-one-component',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss']
})

export class PhaseOneComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('gameArea', {static: false}) gameArea!: ElementRef;
  @ViewChild('editor') editor!: AceEditorComponent;

  initialCode: string = "// Vira o Sapo Alquimista para cima\nup\n\n// Anda 15 passos. Modifique este valor para alcançar o elemento\nstep 15";
  code: string = this.initialCode;

  indexText: number = 0;
  modalTexts: string[] = [
    "Olá, sou Sapo Alquimista e preciso de sua ajuda para realizar alguns experimentos científicos.",
    "Eu quero produzir a Pedra Filosofal.",
    "Para isso, é necessário que você me ajude pegando os elementos certos.",
    "Vamos começar pegando o elemento Ag (prata).",
  ];

  isRunning: boolean = false;

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;
  comandos = new Map();

  digitando: boolean = false;

  Range = ace.require('ace/range').Range;

  timeoutToCallFunction: any = null;

  @ViewChild('modalFimDeFase', {static: false}) modalFimDeFase!: TemplateRef<any>
  modalFimDeFaseRef!: BsModalRef;

  @ViewChild('modalTutorial', {static: false}) modalTutorial!: TemplateRef<any>
  modalTutorialRef!: BsModalRef;

  endGameInformations!: EndGameInformations;

  stars: string[] = [];

  user!: User;

  constructor(private modalService: BsModalService, protected attemptsService: AttemptsService, protected router: Router) {
    super(router, attemptsService);
  }

  ngOnInit() {
    this.comandos.set('left', 'left');
    this.comandos.set('right', 'right');
    this.comandos.set('up', 'up');
    this.comandos.set('down', 'down');
    this.comandos.set('step', new RegExp('step [- +]?[0-9]+', 'g'));
    this.comandos.set('angle', new RegExp('angle [- +]?[0-9]+', 'g'));

    this.scene = new ScenePhaseOne(this.config);
  }

  ngAfterViewInit() {
    this.config = {
      width: 700,
      height: 600,
      type: Phaser.AUTO,
      parent: this.gameArea.nativeElement,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0},
          debug: false
        }
      },
      audio: {
        disableWebAudio: true
      },
      transparent: false
    };

    this.config.scene = this.scene;
    this.game = new Phaser.Game(this.config);

    this.editor.setMode("javascript");
    this.editor.setText(this.code);

    this.editor.getEditor().setOptions({
      fontSize: 20,
      enableMultiselect: true,
      wrap: true,
      useWorker: false,
      animatedScroll: true,
      tabSize: 2,
    });

    this.editor.getEditor().selection.moveCursorFileEnd();
    this.editor.getEditor().focus();

    this.openModalTutorial();
  }

  async readConsoleText() {
    if (this.code && !this.isRunning) {
      let lines = this.getLinesValid(this.code);
      let comandosDigitados = this.getComands(lines);

      if (!comandosDigitados.invalidComands.length && comandosDigitados.validComands.length) {
        this.isRunning = true;
        let endGameInformations = await this.scene.executeCommands(comandosDigitados.validComands, this.editor.getEditor());
        this.isRunning = false;
        this.verificaEstadoDoJogo(endGameInformations);
      }
    }
  }

  getLinesNumber(): number[] {
    let linesArray = [];
    if (this.code?.split("\n").length) {
      let lines = this.code.split("\n");
      for (let line = 1; line <= lines.length; line++) {
        linesArray.push(line);
      }
      return linesArray;
    }
    return [1];
  }

  getLinesValid(text: string): string[] {
    let lines = text.split('\n');

    lines = lines.map(line => {
      line = line.trim();
      while (line.includes("  ")) {
        line = line.replace("  ", " ");
      }
      return line;
    });

    return lines;
  }

  getComands(lines: string[], showError: boolean = true) {

    let validComands: LineCodeModel[] = [];
    let invalidComands: LineCodeModel[] = [];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = lines[lineIndex];

      if (line.startsWith("//") || line.length == 0) {
        continue;
      }

      if (line.includes(' ')) {
        let tipoComando = line.split(' ')[0];

        // @ts-ignore
        if (line.match(this.comandos.get(tipoComando)) && line.match(this.comandos.get(tipoComando))[0] == line) {
          validComands.push({line: lineIndex, value: line} as LineCodeModel);
        } else {
          invalidComands.push({line: lineIndex, value: line} as LineCodeModel);
          if (showError) {
            this.alertCodeError(line, lineIndex);
            break;
          }
        }
      } else {
        if (typeof this.comandos.get(line) === "string") {
          validComands.push({line: lineIndex, value: line} as LineCodeModel);
        } else {
          invalidComands.push({line: lineIndex, value: line} as LineCodeModel);
          if (showError) {
            this.alertCodeError(line, lineIndex);
            break;
          }
        }
      }
    }

    return {
      invalidComands: invalidComands,
      validComands: validComands
    };
  }

  alertCodeError(line: string, lineIndex: number) {
    Swal.fire({
      title: 'Você precisa corrigir a linha ' + (lineIndex + 1),
      text: `O que significa "` + line + '"?',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  mudouTexto(event: any) {
    this.code = event;
    this.scene.emitSoundKeyPress();

    if (this.code) {
      clearTimeout(this.timeoutToCallFunction);
      this.timeoutToCallFunction = setTimeout(() => {

        let lines = this.getLinesValid(this.code);
        let comandosDigitados = this.getComands(lines, false);

        const prevMarkers = this.editor.getEditor().session.getMarkers(false);
        if (prevMarkers) {
          const prevMarkersArr = Object.keys(prevMarkers);
          for (let item of prevMarkersArr) {
            this.editor.getEditor().session.removeMarker(prevMarkers[item].id);
          }
        }

        if (comandosDigitados.invalidComands.length) {
          const Range = ace.require('ace/range').Range;

          comandosDigitados.invalidComands.forEach(comandoErrado => {
            this.editor.getEditor().session.addMarker(new Range(comandoErrado.line, 0, comandoErrado.line, 1), "marcadorDeLinhaErrada", "fullLine");
          })
        }
      }, 500);
    }
  }

  resetCode() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: `Isso irá apagar todo o código que foi digitado.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#888888',
      confirmButtonText: '&nbsp;&nbsp;&nbsp;Sim&nbsp;&nbsp;&nbsp;',
      cancelButtonText: '&nbsp;&nbsp;&nbsp;Não&nbsp;&nbsp;&nbsp;'
    }).then((result) => {
      if (result.isConfirmed) {
        this.scene.restart();
        this.code = this.initialCode;
        this.editor.setText(this.code);
        this.isRunning = false;
      }
    });
  }

  async inserirComando(comando: string) {

    if (!this.digitando) {
      this.digitando = true;

      while (comando.length > 0) {
        let cursorPosition = this.editor.getEditor().getCursorPosition();

        let linhas = this.code.split("\n");

        let linhaDoCursor = linhas[cursorPosition.row];

        let parteEsquerdaDaLinha = linhaDoCursor.substring(0, cursorPosition.column);
        let parteDireitaDaLinha = linhaDoCursor.substring(cursorPosition.column, linhaDoCursor.length);

        linhas[cursorPosition.row] = parteEsquerdaDaLinha + comando.charAt(0) + parteDireitaDaLinha;

        this.code = linhas.join("\n");
        this.editor.setText(this.code);

        if (comando.charAt(0) == "\n") {
          this.editor.getEditor().moveCursorTo(cursorPosition.row + 1, 0);
        } else {
          this.editor.getEditor().moveCursorTo(cursorPosition.row, cursorPosition.column + 1);
        }

        comando = comando.substring(1, comando.length);

        this.scene.emitSoundKeyPress();

        await this.delay(100);
      }

      this.editor.getEditor().focus();
      this.digitando = false;
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  normalizarComando(comando: string): string {
    if (!comando.startsWith("\n"))
      comando = "\n" + comando;

    if (!comando.endsWith(" "))
      comando += " ";

    return comando
  }

  stopExecution() {
    this.closeModalFimDeFase();
    this.scene.restart();
    this.isRunning = false;
  }

  objetivoConcluido(){
    if (this.endGameInformations.collectedElements.length == 1) {
      return true;
    }
    return false;
  }

  verificaEstadoDoJogo(endGameInformations: EndGameInformations) {
    this.stars = ["vazia", "vazia", "vazia"];
    this.endGameInformations = endGameInformations;

    endGameInformations.success = this.objetivoConcluido();
    this.saveAttempt(endGameInformations);

    if(this.objetivoConcluido()){
      this.scene.musicSuccess();
    } else {
      this.scene.musicFail();
    }

    this.calculaEstrelas();

    this.openModalFimDeFase();

  }

  calculaEstrelas() {
    if (!this.objetivoConcluido()) {
      return;
    } else {
      this.stars[this.stars.indexOf("vazia")] = "cheia";
    }
    if (this.endGameInformations.usedsCommands.length == 2) {
      this.stars[this.stars.indexOf("vazia")] = "cheia";
    }
    else if (this.endGameInformations.usedsCommands.length > 2 && this.endGameInformations.usedsCommands.length <= 3) {
      this.stars[this.stars.indexOf("vazia")] = "meia";
    }
    if (this.endGameInformations.steps >= 18 && this.endGameInformations.steps <= 20) {
      this.stars[this.stars.indexOf("vazia")] = "cheia";
    }
    else if (this.endGameInformations.steps >= 20 && this.endGameInformations.steps <= 23) {
      this.stars[this.stars.indexOf("vazia")] = "meia";
    }
  }

  openModalFimDeFase() {

    let config = {
      keyboard: false,
      class: 'modal-fullscreen',
      ignoreBackdropClick: true
    };

    this.modalFimDeFaseRef = this.modalService.show(this.modalFimDeFase, config);
  }

  closeModalFimDeFase() {
    this.modalFimDeFaseRef?.hide();
  }

  nextPhase() {
    if(this.objetivoConcluido()){
      window.location.href = "/game/phaseTwo";
    }
  }

  openModalTutorial() {
    let config = {
      keyboard: false,
      class: 'modal-fullscreen',
      ignoreBackdropClick: true
    };

    this.modalTutorialRef = this.modalService.show(this.modalTutorial, config);
  }

  closeModalTutorial() {
    this.modalTutorialRef?.hide();
  }

  changeText() {
    if (this.indexText < this.modalTexts.length - 1) {
      this.indexText++;
    }
    else {
      this.closeModalTutorial();
    }
  }

  filtraEstrelas(filtro: string) {
    return this.stars.filter(star => star == filtro);
  }

  getCorPassos() {
    let cor = "da3636";

    if (this.endGameInformations.steps >= 18 && this.endGameInformations.steps <= 20) {
      cor = "00eb27";
    }
    else if (this.endGameInformations.steps >= 20 && this.endGameInformations.steps <= 23) {
      cor = "fdc90f";
    }

    return cor;
  }

  getCorComandos() {
    let cor = "da3636";

    if (this.endGameInformations.usedsCommands.length == 2) {
      cor = "00eb27";
    }
    else if (this.endGameInformations.usedsCommands.length > 2 && this.endGameInformations.usedsCommands.length <= 3) {
      cor = "fdc90f";
    }

    return cor;
  }

  getCorTempo() {
    let cor = "da3636";

    if (this.endGameInformations.timeInSeconds <= 3) {
      cor = "00eb27";
    }
    else if (this.endGameInformations.timeInSeconds > 3 && this.endGameInformations.timeInSeconds <= 5) {
      cor = "fdc90f";
    }

    return cor;
  }

  getCorElementos() {
    let cor = "da3636";

    if (this.endGameInformations.collectedElements.length == 1) {
      cor = "00eb27";
    }

    return cor;
  }
}
