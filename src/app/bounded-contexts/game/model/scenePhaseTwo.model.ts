import Phaser from "phaser";
import {LineCodeModel} from "./line-code.model";
import {EndGameInformations} from "./end-game.informations";
import moment from "moment";

declare const ace: any;

export class ScenePhaseTwo extends Phaser.Scene {
  sapoAlquimista!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  elementos!: Phaser.Physics.Arcade.StaticGroup;
  music!: Phaser.Sound.BaseSound;
  passos!: Phaser.Sound.BaseSound;
  coleta!: Phaser.Sound.BaseSound;
  sucesso!: Phaser.Sound.BaseSound;
  falha!: Phaser.Sound.BaseSound;

  musicVolume: number = localStorage.getItem('volumePrincipal') ? Number(localStorage.getItem('volumePrincipal')) / 100 : 0.2;
  sfxVolume: number = localStorage.getItem('efeitosSonoros') ? Number(localStorage.getItem('efeitosSonoros')) / 100 : 1;

  comandos: LineCodeModel[] = [];

  angulos = new Map();

  collectedElements: string[] = [];

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

    this.load.image('nitrogenio', 'https://media.discordapp.net/attachments/593811885787447297/938532685805150228/n.png');
    this.load.image('hidrogenio', 'https://media.discordapp.net/attachments/593811885787447297/938532695049392218/h.png');
    this.load.image('oxigenio', 'https://media.discordapp.net/attachments/593811885787447297/938532702582341652/o.png');
    this.load.image('prata', 'https://media.discordapp.net/attachments/593811885787447297/938532710081790014/ag.png');
    this.load.image('mercurio', 'https://media.discordapp.net/attachments/593811885787447297/938532718344552478/hg.png');

    // this.load.image('reguaVertical', 'assets/images/reguaVertical.png');
    // this.load.image('reguaHorizontal', 'assets/images/reguaHorizontal.png');

    this.load.audio('soundtrack', [
      'assets/sonoplastia/happy-menu.mp3',
      'assets/sonoplastia/happy-menu.ogg'
    ]);

    this.load.audio('teclas', [
      'assets/sonoplastia/teclas/som teclas.wav',
      'assets/sonoplastia/teclas/som teclas.mp3',
    ]);

    this.load.audio('passos', [
      'assets/sonoplastia/personagem/som passos.wav',
      'assets/sonoplastia/personagem/som passos.mp3',
    ]);

    this.load.audio('sucesso', [
      'assets/sonoplastia/levelUp.wav',
      'assets/sonoplastia/levelUp.mp3',
    ]);

    this.load.audio('coletou', [
      'assets/sonoplastia/coletouElemento.wav',
      'assets/sonoplastia/coletouElemento.mp3',
    ]);

    this.load.audio('falhou', [
      'assets/sonoplastia/Game_Lost.wav',
      'assets/sonoplastia/Game_Lost.mp3',
    ]);

  }

  create() {
    this.add.image(0, 0, 'cenario').setOrigin(0, 0);
    // this.add.image(0, 0, 'reguaVertical').setOrigin(0, 0);
    // this.add.image(0, 600-40, 'reguaHorizontal').setOrigin(0, 0);

    let objetos = this.physics.add.staticGroup();
    this.elementos = this.physics.add.staticGroup();

    this.loadObjects(objetos);
    this.loadElementos();

    this.loadSapoAlquimista(objetos);

    this.loadSomFundo();

    this.coleta = this.sound.add('coletou');
    this.sucesso = this.sound.add('sucesso');
    this.falha = this.sound.add('falhou');

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

  loadElementos() {
    // let nitrogenio = this.add.image(this.game.scale.width / 3, this.game.scale.height / 3, 'nitrogenio').setScale(0.5, 0.5);
    // this.elementos.add(nitrogenio, true);
    // let hidrogenio = this.add.image(0, this.game.scale.height / 2, 'hidrogenio').setScale(0.5, 0.5).setOrigin(0, 0);
    // this.elementos.add(hidrogenio, true);
    // let oxigenio = this.add.image((this.game.scale.width / 3) + 20, 50, 'oxigenio').setScale(0.5, 0.5);
    // this.elementos.add(oxigenio, true);
    let prata = this.add.image(this.game.scale.width / 2, this.game.scale.height / 3, 'prata').setScale(0.35, 0.35);
    this.elementos.add(prata, true);
    // let mercurio = this.add.image(this.game.scale.width - 100, this.game.scale.height / 5, 'mercurio').setScale(0.5, 0.5).setOrigin(0, 0);
    // this.elementos.add(mercurio, true);
  }

  loadSapoAlquimista(objetos: any) {
    this.sapoAlquimista = this.physics.add
      .sprite(this.game.scale.width / 2, this.game.scale.height / 1.3, 'sapoAlquimista')
      .setOrigin(0, 0);

    this.sapoAlquimista.scaleX = .15;
    this.sapoAlquimista.scaleY = .15;

    this.sapoAlquimista.setCollideWorldBounds(true);
    this.physics.add.collider(this.sapoAlquimista, objetos);

    this.physics.add.overlap(this.sapoAlquimista, this.elementos, this.collectElement, () => {}, this);

    this.sapoAlquimista.setDisplayOrigin(this.sapoAlquimista.width / 2, this.sapoAlquimista.height / 2);

    this.anims.create({
      key: 'andar',
      frames: this.anims.generateFrameNumbers('sapoAlquimista', { start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
    });

  }

  loadSomFundo() {
    this.music = this.sound.add('soundtrack');
    this.music.play({
      mute: false,
      loop: true,
      volume: this.musicVolume
    });
  }

  collectElement(sapo: any, elemento: any) {
    this.collectedElements.push(elemento.texture.key);

    elemento.destroy();

    this.coleta.play({
      mute: false,
      loop: false,
      volume: this.sfxVolume,
    });

  }

  async executeCommands(comandos: LineCodeModel[], editor: any) {
    this.collectedElements = [];

    let endGameInformations = new EndGameInformations();
    endGameInformations.usedsCommands = comandos.map(comando => comando.value);
    endGameInformations.steps = 0;

    let steps = comandos
      .filter(comando => comando.value.startsWith("step"))
      .map(comando => Math.abs(Number(comando.value.split(" ")[1])));

    if (steps.length) {
      endGameInformations.steps += steps.reduce((a, b) => a + b);
    }

    const Range = ace.require('ace/range').Range;

    this.comandos = comandos;

    this.passos = this.sound.add('passos');
    this.passos.play({
      mute: false,
      loop: true,
      volume: this.sfxVolume,
    });

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

    this.passos?.stop();

    endGameInformations.timeInSeconds = endTime.diff(startTime, 'seconds');

    endGameInformations.collectedElements = this.collectedElements;

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
    this.passos?.stop();
    this.scene.restart();
  }

  emitSoundKeyPress() {
    const teclas = this.sound?.add('teclas');
    teclas?.play({volume: this.sfxVolume*2});
  }

  musicSuccess(){

    this.sucesso.play({
      mute: false,
      loop: false,
      volume: this.sfxVolume,
    });

  }

  musicFail(){

    this.falha.play({
      mute: false,
      loop: false,
      volume: this.sfxVolume,
    });

  }
}
