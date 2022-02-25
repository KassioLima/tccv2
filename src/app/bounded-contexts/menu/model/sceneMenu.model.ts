import Phaser from "phaser";
import ScaleManager = Phaser.Scale.ScaleManager;

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

    this.load.spritesheet('menu', 'https://media.discordapp.net/attachments/593811885787447297/924780848434274305/menujogo.png',
    { frameWidth: 1310, frameHeight: 667});

    this.load.audio('theme', [
      'assets/sonoplastia/awesomeness-menu.wav',
      'assets/sonoplastia/awesomeness-menu.ogg'
    ]);

    this.load.audio('clique', ['assets/sonoplastia/Menu Selection Click.wav']);

  }

  create (){
    this.showMenu();
  }

  update() {
    const clique = this.sound.add('clique');
    this.input.on('pointerdown', function () {
      clique.play({volume: 0.1});
    });
  }

  showMenu() {

    let menu = this.add.sprite(0, (window.innerHeight - ((window.innerWidth * 667) / 1310)) / 2, 'menu').setOrigin(0, 0);
    menu.setDisplaySize(window.innerWidth, (window.innerWidth * 667) / 1310);

   /* let menu = this.add.sprite(0, (this.scale.height - ((this.scale.width * 667) / 1310)) / 2, 'menu').setOrigin(0, 0);
    menu.setDisplaySize(this.scale.width, (this.scale.width * 667) / 1310);

    this.scale.on('resize', this.resize, this);*/



    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    menu.anims.play('turn');

    this.playBgMusic(this.musicConfig);
  }


  /*resize (gameSize, baseSize, displaySize, resolution){
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);

    //menu.setSize(width, height);

  }*/

  playBgMusic(config: any) {
    let music = this.sound.add('theme');
    music.play(config);
  }

  emitSoundClick() {
    const clique = this.sound.add('clique');
    clique.play({volume: 1});
  }

}
