import Phaser from "phaser";
import {LineCodeModel} from "./line-code.model";
import {EndGameInformations} from "./end-game.informations";
import moment from "moment";
import {elementAt} from "rxjs/operators";

declare const ace: any;

export class ScenePhaseOne extends Phaser.Scene {
  sapoAlquimista!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  musicConfig = {
    mute: false,
    loop: true,
    volume: 0.01
  }

  comandos: LineCodeModel[] = [];

  angulos = new Map();

  constructor (config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.angulos.set('left', 90);
    this.angulos.set('right', -90);
    this.angulos.set('up', 180);
    this.angulos.set('down', 0);

    moment.locale('pt-br');
  }

  preload() {

    this.load.image('cenario', 'https://media.discordapp.net/attachments/480173501379248131/934921906136690828/cenario_do_jogo.png');
    this.load.image('mesa', 'https://media.discordapp.net/attachments/847914147944857631/929153185640222760/mesa.png');
    this.load.image('parede', 'https://media.discordapp.net/attachments/847914147944857631/929153210093010954/parede.png');
    this.load.image('armario1', 'https://media.discordapp.net/attachments/847914147944857631/929153224840196156/armario175X26.png');
    this.load.image('armario2', 'https://media.discordapp.net/attachments/847914147944857631/929153236127088720/armario404X10.png');
    this.load.image('armario3', 'https://media.discordapp.net/attachments/847914147944857631/929153246797394021/armario579X19.png');
    this.load.image('armario4', 'https://media.discordapp.net/attachments/847914147944857631/929153258377855066/armario767X44.png');

    this.load.spritesheet('tocha', 'https://media.discordapp.net/attachments/847914147944857631/928718585734512670/spriteTocha.png',
    { frameWidth: 50, frameHeight: 100});

    this.load.spritesheet('sapoAlquimista', 'http://media.discordapp.net/attachments/593811885787447297/936132479281168434/spriteSapo.png',
    {frameWidth: 527, frameHeight: 331});

    this.load.spritesheet('elementos', 'http://media.discordapp.net/attachments/593811885787447297/937570661583437874/elementosQuimicos.png',
      {frameWidth: 680, frameHeight: 133});

    this.load.audio('soundtrack', [
      'assets/sonoplastia/happy-menu.mp3',
      'assets/sonoplastia/happy-menu.ogg'
    ]);

    this.load.audio('teclas', [
      'assets/sonoplastia/teclas/som teclas.wav',
      'assets/sonoplastia/teclas/som teclas.mp3',
    ]);
  }

  create() {
    this.add.image(0, 0, 'cenario').setOrigin(0, 0);

    let objetos = this.physics.add.staticGroup();
    this.loadObjects(objetos);

    this.loadSapoAlquimista(objetos);

    this.loadSomFundo();
  }

  update() {}

  loadObjects(objetos: any) {
    this.loadParede(objetos);
    this.loadMesa(objetos);
    this.loadArmarios(objetos);
    this.loadTocha(objetos);
  }

  loadParede(objetos: any) {
    let imagemParede = this.add.image(0,0, 'parede')
      .setOrigin(0, 0)
      .setDisplaySize(this.game.scale.width, (108 * this.game.scale.width) / 952);
    objetos.add(imagemParede, true);
  }

  loadArmarios(objetos: any) {

    let imagemArmario1 = this.add.image(130, 20, 'armario1').setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(imagemArmario1, true);

    let imagemArmario2 = this.add.image(300, 20, 'armario2').setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(imagemArmario2, true);

    let imagemArmario3 = this.add.image(420, 36, 'armario3').setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(imagemArmario3, true);

    let imagemArmario4 = this.add.image(580, 34, 'armario4').setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(imagemArmario4, true);
  }

  loadTocha(objetos: any) {
    let tocha = this.add.sprite(this.game.scale.width * (72.6 / 100),0, 'tocha')
      .setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(tocha, true);

    this.anims.create({
      key: 'acender',
      frames: this.anims.generateFrameNumbers('tocha', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    tocha.anims.play('acender');
  }

  loadMesa(objetos: any) {
    let mesaScaleX = 0.5;
    let mesaScaleY = 0.5;
    let imagemMesa = this.add.image(this.game.scale.width / 2, this.game.scale.height - ((mesaScaleY * 220) / 2), 'mesa').setScale(mesaScaleX, mesaScaleY);
    objetos.add(imagemMesa, true);
  }

  loadSapoAlquimista(objetos: any) {
    this.sapoAlquimista = this.physics.add
      .sprite(this.game.scale.width / 2, this.game.scale.height / 1.3, 'sapoAlquimista')
      .setOrigin(0, 0);

    this.sapoAlquimista.scaleX = .15;
    this.sapoAlquimista.scaleY = .15;

    this.sapoAlquimista.setCollideWorldBounds(true);
    this.physics.add.collider(this.sapoAlquimista, objetos);

    this.sapoAlquimista.setDisplayOrigin(this.sapoAlquimista.width / 2, this.sapoAlquimista.height / 2);

    this.anims.create({
      key: 'andar',
      frames: this.anims.generateFrameNumbers('sapoAlquimista', { start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
    });

    let elemento = 0;

    let objetos2 = this.physics.add.staticGroup();

    let nitrogenio = this.add
      .image(0, this.game.scale.height / 2, 'elementos', 3)
      .setOrigin(0, 0)
      .setCrop((680 / 5) * elemento, 0, 680 / 5, 133);

    objetos2.add(nitrogenio, true);

    this.physics.add.collider(this.sapoAlquimista, objetos2);
  }

  loadSomFundo() {
    let music = this.sound.add('soundtrack');
    music.play(this.musicConfig);
  }

  async executeCommands(comandos: LineCodeModel[], editor: any) {

    let endGameInformations = new EndGameInformations();
    endGameInformations.commandsAmount = comandos.length;
    endGameInformations.steps = 0;

    let steps = comandos
      .filter(comando => comando.value.startsWith("step"))
      .map(comando => Math.abs(Number(comando.value.split(" ")[1])));

    if (steps.length) {
      endGameInformations.steps += steps.reduce((a, b) => a + b);
    }

    const Range = ace.require('ace/range').Range;

    this.comandos = comandos;

    let startTime = moment();
    while (this.comandos.length > 0) {

      let comando = this.comandos[0];

      editor.session.addMarker(new Range(comando.line, 0, comando.line, 1), "marcadorDeLinhaEmExecucao", "fullLine");


      editor.resize(true);
      editor.scrollToLine(comando.line, true, true, function () {});

      if (!comando.value.includes(' ')) {
        await this.virarPersonagemParaLado(comando.value);
      }

      else {
        let tipoComando = comando.value.split(' ')[0];
        if (tipoComando == 'step') {
          let passos = Number(comando.value.split(' ')[1]);
          await this.andarSapo(passos);
        }
        else if (tipoComando == 'angle') {
          let angulo = Number(comando.value.split(' ')[1]);
          await this.virarPersonagemComAngulo(angulo);
        }
      }

      this.comandos.splice(0, 1);

      const prevMarkers = editor.session.getMarkers(false);
      if (prevMarkers) {
        const prevMarkersArr = Object.keys(prevMarkers);
        for (let item of prevMarkersArr) {
          editor.session.removeMarker(prevMarkers[item].id);
        }
      }
    }
    let endTime = moment();

    endGameInformations.timeInSeconds = endTime.diff(startTime, 'seconds');

    return endGameInformations;
  }

  async virarPersonagemParaLado(comando: string) {
    let angulo = this.angulos.get(comando);
    let caminho = Phaser.Math.Angle.ShortestBetween(this.sapoAlquimista.angle, angulo);
    await this.virarPersonagemComAngulo(caminho);
  }

  async virarPersonagemComAngulo(angulo: number) {
    if(!angulo) return;

    let countAngle = 0;
    this.sapoAlquimista.anims.play('andar');
    if (countAngle > angulo) {

      //&& this.comandos.length foi adicionado pois o personagem precisa parar assim que o array de comandos for zerado
      //isso acontece quando o usuário pressiona o botão de restart
      while (countAngle > angulo && this.comandos.length) {
        countAngle--;
        this.sapoAlquimista.angle--;
        await this.delay(10);
      }
    }
    else {
      while (countAngle < angulo && this.comandos.length) {
        countAngle++;
        this.sapoAlquimista.angle++;
        await this.delay(10);
      }
    }
    this.sapoAlquimista.anims.stop();
  }

  async andarSapo(passos: number) {
    let velocidade = 150;
    let sentido = passos < 0 ? -1 : 1;
    // Nosso personagem já vem com o sprite virado para 90º, então compensamos isso na conversão do angulo para rad
    const compensacaoDeAngulo = 90;
    let angulo = Phaser.Math.DegToRad(this.sapoAlquimista.angle + compensacaoDeAngulo);
    this.physics.velocityFromRotation(angulo, velocidade * sentido, this.sapoAlquimista.body.velocity);

    this.sapoAlquimista.anims.play('andar');

    await this.delay(Math.abs(passos) * 80);
    this.sapoAlquimista.setVelocity(0, 0);
    this.sapoAlquimista.anims.stop();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  restart() {
    this.comandos = [];
    this.scene.restart();
  }

  emitSoundKeyPress() {
    const clique = this.sound?.add('teclas');
    clique?.play({volume: 1});
  }
}
