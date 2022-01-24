import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Phaser from "phaser";
import {ScenePhaseOne} from "../../model/scenePhaseOne.model";
import {CanDeactivateComponent} from "../../../../core/components/can-deactivate.component";

@Component({
  selector: 'app-phase-one-component',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss']
})
export class PhaseOneComponent extends CanDeactivateComponent implements OnInit, AfterViewInit {

  @ViewChild('gameArea', { static: false }) gameArea!: ElementRef;
  @ViewChild('code', { static: false }) code!: ElementRef;

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
  }

  readConsoleText() {
    if(this.code.nativeElement.value) {
      let lines = this.getLines(this.code.nativeElement.value);
      let comandosDigitados = this.getComands(lines);

      if(!comandosDigitados.invalidComands.length && comandosDigitados.validComands.length) {
        this.scene.executeCommands(comandosDigitados.validComands);
      }
    }
  }

  getLines(text: string): string[] {
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

      if(line.includes(' ')) {
        let tipoComando = line.split(' ')[0];

        if(line.match(this.comandos.get(tipoComando))) {
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
}
