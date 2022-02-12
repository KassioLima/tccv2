import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {ScenePhaseOne} from "../../../model/scenePhaseOne.model";
import {CanDeactivateComponent} from "../../../../../core/components/can-deactivate.component";
import {AceEditorComponent} from "ng2-ace-editor";
import Swal from "sweetalert2";
import {LineCodeModel} from "../../../model/line-code.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {EndGameInformations} from "../../../model/end-game.informations";

declare const ace: any;

@Component({
  selector: 'app-phase-one-component',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss']
})

export class PhaseOneComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('gameArea', {static: false}) gameArea!: ElementRef;
  @ViewChild('editor') editor!: AceEditorComponent;

  initialCode: string = "up\nstep 5";
  code: string = this.initialCode;

  isRunning: boolean = false;

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;
  comandos = new Map();

  digitando: boolean = false;

  Range = ace.require('ace/range').Range;

  timeoutToCallFunction: any = null;

  @ViewChild('modalFimDeFase', {static: false}) modalFimDeFase!: TemplateRef<any>
  modalFimDeFaseRef!: BsModalRef;

  endGameInformations!: EndGameInformations;

  constructor(private modalService: BsModalService) {
    super();
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

    this.editor.setMode("javascript");
    this.editor.setText(this.code);

    this.editor.getEditor().setOptions({
      fontSize: 20,
      enableMultiselect: true,
      wrap: true,
      useWorker: false,
      animatedScroll: true,
    });

    this.editor.getEditor().selection.moveCursorFileEnd();
    this.editor.getEditor().focus();
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
    let lines = text.split('\n')/*.filter(c => c.length > 0)*/;

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

  verificaEstadoDoJogo(endGameInformations: EndGameInformations) {
    this.endGameInformations = endGameInformations;
    this.openModalFimDeFase();
  }

  openModalFimDeFase() {

    let config = {
      keyboard: false,
      class: 'modal-dialog-centered modal-dialog-scrollable',
      ignoreBackdropClick: true
    };

    this.modalFimDeFaseRef = this.modalService.show(this.modalFimDeFase, config);
  }

  closeModalFimDeFase() {
    this.modalFimDeFaseRef.hide();
  }

  nextPhase() {
    if (this.endGameInformations.collectedElements.length == 1) {

    }
  }
}
