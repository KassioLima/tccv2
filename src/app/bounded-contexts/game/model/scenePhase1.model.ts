import Phaser from "phaser";

export class ScenePhase1 extends Phaser.Scene {
  FromInGame: any;
  preloadStatus: any;

  musicConfig = {
    mute: false,
    loop: true,
    volume: 0.2
  }

  constructor (config: any, FromInGame: any, preloadStatus: any){
    super(config);
  }

  preload (){

    this.load.image('cenario', 'https://media.discordapp.net/attachments/847914147944857631/928718557905305600/cenario_do_jogo.png');

    this.load.image('mesa', 'https://media.discordapp.net/attachments/847914147944857631/929153185640222760/mesa.png');

    this.load.image('parede', 'https://media.discordapp.net/attachments/847914147944857631/929153210093010954/parede.png');

    this.load.image('armario1', 'https://media.discordapp.net/attachments/847914147944857631/929153224840196156/armario175X26.png');
    this.load.image('armario2', 'https://media.discordapp.net/attachments/847914147944857631/929153236127088720/armario404X10.png');
    this.load.image('armario3', 'https://media.discordapp.net/attachments/847914147944857631/929153246797394021/armario579X19.png');
    this.load.image('armario4', 'https://media.discordapp.net/attachments/847914147944857631/929153258377855066/armario767X44.png');

    this.load.spritesheet('tocha', 'https://media.discordapp.net/attachments/847914147944857631/928718585734512670/spriteTocha.png',
    { frameWidth: 50, frameHeight: 100});

    this.load.spritesheet('sapoAlquimista', 'http://media.discordapp.net/attachments/847914147944857631/928782411230220318/spriteSapo.png',
    {frameWidth: 670, frameHeight: 670});

    this.load.audio('soundtrack', [
      'assets/sonoplastia/happy-menu.mp3',
      'assets/sonoplastia/happy-menu.ogg'
    ]);


  }

  create (){

    //Montando o cenário

    this.add.image(0, 0, 'cenario').setOrigin(0, 0);

    var objetos;

    objetos = this.physics.add.staticGroup();

    objetos.create(247, 575, 'mesa').setOrigin(0, 0);
    objetos.create(0, 0, 'parede').setOrigin(0, 0);

    objetos.create(175, 26, 'armario1').setOrigin(0, 0);
    objetos.create(404, 10, 'armario2').setOrigin(0, 0);
    objetos.create(579, 19, 'armario3').setOrigin(0, 0);
    objetos.create(767, 44, 'armario4').setOrigin(0, 0);

    var tocha = this.add.sprite(686, 0, 'tocha').setOrigin(0, 0);
    //tocha.setDisplaySize(50, 100);

    this.anims.create({
    key: 'turn',
    frames: this.anims.generateFrameNumbers('tocha', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1
    });

    tocha.anims.play('turn');

    var music = this.sound.add('soundtrack');

    music.play(this.musicConfig);

    var sapoAlquimista = this.physics.add.sprite(365, 420, 'sapoAlquimista').setOrigin(0, 0);

    sapoAlquimista.scaleX = 0.3;
    sapoAlquimista.scaleY = 0.3;

    sapoAlquimista.flipY = true;

    //sapoAlquimista.setAngle(270);

    this.input.on('pointerdown', function () {

      //  Flipped via a call to toggleFlipX
      sapoAlquimista.toggleFlipY();

    });

    sapoAlquimista.anims.play('left');

    //sapoAlquimista.setCollideWorldBounds(true);
    //this.physics.add.collider(sapoAlquimista, objetos);

  }

  update(){
  }

}
