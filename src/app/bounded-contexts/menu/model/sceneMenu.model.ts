import Phaser from "phaser";

export class SceneMenu extends Phaser.Scene {
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

    this.load.spritesheet('menu', 'http://media.discordapp.net/attachments/593811885787447297/924780848434274305/menujogo.png',
    { frameWidth: 1310, frameHeight: 667});

    this.load.audio('theme', [
      'assets/sonoplastia/awesomeness-menu.wav',
      'assets/sonoplastia/awesomeness-menu.ogg'
    ]);

    this.load.audio('clique', ['assets/sonoplastia/Menu Selection Click.wav']);

  }

  create (){

    var menu = this.add.sprite(0, (window.innerHeight - ((window.innerWidth * 667) / 1310)) / 2, 'menu').setOrigin(0, 0);
    menu.setDisplaySize(window.innerWidth, (window.innerWidth * 667) / 1310)

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    menu.anims.play('turn');

    var music = this.sound.add('theme');

    music.play(this.musicConfig);
  }

  update(){

    //quando clica em qualquer lugar ele faz o som, porém quando clica no start não
    var clique = this.sound.add('clique');

    this.input.on('pointerdown', function () {

      clique.play({volume: 1});

    });

  }

}
