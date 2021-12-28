import Phaser from "phaser";

export class SceneMenu extends Phaser.Scene {
  FromInGame: any;
  preloadStatus: any;

  constructor (config: any, FromInGame: any, preloadStatus: any){
    super(config);
  }

  preload (){

    this.load.spritesheet('menu', 'http://media.discordapp.net/attachments/593811885787447297/924780848434274305/menujogo.png',
    { frameWidth: 1310, frameHeight: 667});

    this.load.audio('theme', [
    'https://s19.aconvert.com/convert/p3r68-cdx67/bb1dq-6qrvv.wav',
    ]);
  }

  create (){

    var menu = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    menu.anims.play('turn');

    var music = this.sound.add('theme');

    var musicConfig = {
      mute:false,
      loop: true
    }

    music.play(musicConfig);

  }

  update(){

  }

}
