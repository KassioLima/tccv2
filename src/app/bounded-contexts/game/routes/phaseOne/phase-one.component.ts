import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {ScenePhaseOne} from "../../model/scenePhaseOne.model";
import {CanDeactivateComponent} from "../../../../core/components/can-deactivate.component";
import {AceEditorComponent} from "ng2-ace-editor";

@Component({
  selector: 'app-phase-one-component',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss']
})

export class PhaseOneComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('gameArea', { static: false }) gameArea!: ElementRef;
  @ViewChild('editor') editor!: AceEditorComponent;

  code: string = "//Código inicial\n\nstep 15";

  config!: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;
  comandos = new Map();
  constructor() {
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

    this.editor.setMode("javascript");
    this.editor.setText(this.code);

    this.editor.getEditor().setOptions({
      fontSize: 20,
      enableMultiselect: true,
      wrap: true,
      useWorker: false
    });
  }

  readConsoleText() {
    if(this.code) {
      let lines = this.getLinesValid(this.code);
      let comandosDigitados = this.getComands(lines);

      if(!comandosDigitados.invalidComands.length && comandosDigitados.validComands.length) {
        this.scene.executeCommands(comandosDigitados.validComands);
      }
    }
  }

  getLinesNumber(): number[] {
    let linesArray = [];
    if (this.code?.split("\n").length) {
      let lines = this.code.split("\n");
      for(let line = 1; line <= lines.length; line++) {
        linesArray.push(line);
      }
      return linesArray;
    }
    return [1];
  }

  getLinesValid(text: string): string[] {
    let lines = text.split('\n').filter(c => c.length > 0);

    lines = lines.map(line => {
      line = line.trim();
      while (line.includes("  ")) {
        line = line.replace("  ", " ");
      }
      return line;
    });

    return lines;
  }

  getComands(lines: string[]) {

    let validComands = [];
    let invalidComands = [];

    for(let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = lines[lineIndex];

      if(line.startsWith("//")) {
        continue;
      }

      if(line.includes(' ')) {
        let tipoComando = line.split(' ')[0];

        // @ts-ignore
        if(line.match(this.comandos.get(tipoComando))[0] == line) {
          validComands.push(line);
        }
        else {
          invalidComands.push(line);
          break;
        }
      }

      else {
        if(this.comandos.get(line)) {
          validComands.push(this.comandos.get(line));
        }
        else {
          invalidComands.push(line);
          break;
        }
      }
    }

    return {
      invalidComands: invalidComands,
      validComands: validComands
    };
  }

  mudouTexto(event: any) {
    this.code = event;
    this.scene.emitSoundKeyPress();
  }

  resetCode() {
    this.scene.restart()
  }

  async inserirComando(comando: string) {

    if (comando.length > 0) {

      let cursorPosition = this.editor.getEditor().getCursorPosition();

      let linhas = this.code.split("\n");

      let linhaDoCursor = linhas[cursorPosition.row];

      let parteEsquerdaDaLinha = linhaDoCursor.substring(0, cursorPosition.column);
      let parteDireitaDaLinha = linhaDoCursor.substring(cursorPosition.column, linhaDoCursor.length);

      linhas[cursorPosition.row] = parteEsquerdaDaLinha + comando.charAt(0) + parteDireitaDaLinha;

      this.code = linhas.join("\n");
      this.editor.setText(this.code);

      if(comando.charAt(0) == "\n") {
        this.editor.getEditor().moveCursorTo(cursorPosition.row + 1, 0);
      }
      else {
        this.editor.getEditor().moveCursorTo(cursorPosition.row, cursorPosition.column + 1);
      }

      comando = comando.substring(1, comando.length);

      this.scene.emitSoundKeyPress();

      await this.delay(100);
      await this.inserirComando(comando);
    }

    this.editor.getEditor().focus();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  normalizarComando(comando: string): string {
    if(!comando.startsWith("\n"))
      comando = "\n" + comando;

    if(!comando.endsWith(" "))
      comando += " ";

    return comando
  }
}
