import Phaser from "phaser";

export class ScenePhaseOne extends Phaser.Scene {
  FromInGame: any;
  preloadStatus: any;

  cursors: any;
  sapoAlquimista: any;

  musicConfig = {
    mute: false,
    loop: true,
    volume: 0.2
  }

  constructor (config: any, FromInGame: any, preloadStatus: any){
    super(config);
  }

  preload (){

    this.load.image('cenario', 'https://media.discordapp.net/attachments/480173501379248131/934921906136690828/cenario_do_jogo.png');

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
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(0, 0, 'cenario').setOrigin(0, 0);

    let objetos = this.physics.add.staticGroup();
    this.loadObjects(objetos);

    let music = this.sound.add('soundtrack');
    music.play(this.musicConfig);

    this.sapoAlquimista = this.physics.add.sprite(this.game.scale.width / 2 - (0.1 * 670) / 2, this.game.scale.height / 1.35, 'sapoAlquimista')
      .setOrigin(0, 0);
    this.sapoAlquimista.scaleX = 0.1;
    this.sapoAlquimista.scaleY = 0.1;
    // this.sapoAlquimista.flipY = true;

    //this.sapoAlquimista.setAngle(270);


    // this.sapoAlquimista.anims.play('left');

    this.sapoAlquimista.setCollideWorldBounds(true);
    let sapoObjetos = this.physics.add.collider(this.sapoAlquimista, objetos);
  }

  update() {
    this.sapoAlquimista.setVelocity(0);
    this.sapoAlquimista.setDisplayOrigin(this.sapoAlquimista.width / 2, this.sapoAlquimista.height / 2);

    if (this.cursors.left.isDown) {
      this.sapoAlquimista.setVelocityX(-300);
      this.sapoAlquimista.setAngle(90);
    }
    else if (this.cursors.right.isDown) {
      this.sapoAlquimista.setVelocityX(300);
      this.sapoAlquimista.setAngle(-90);
    }

    if (this.cursors.up.isDown) {
      this.sapoAlquimista.setVelocityY(-300);
      this.sapoAlquimista.setAngle(180);
    }
    else if (this.cursors.down.isDown) {
      this.sapoAlquimista.setVelocityY(300);
      this.sapoAlquimista.setAngle(0);
    }
  }

  loadObjects(objetos: any) {


    let imagemParede = this.add.image(0,0, 'parede')
      .setOrigin(0, 0)
      .setDisplaySize(this.game.scale.width, (108 * this.game.scale.width) / 952);
    objetos.add(imagemParede, true);

    let mesaScaleX = 0.4;
    let mesaScaleY = 0.4;
    let imagemMesa = this.add.image(this.game.scale.width / 2, this.game.scale.height - ((mesaScaleY * 193) / 2), 'mesa').setScale(mesaScaleX, mesaScaleY);
    objetos.add(imagemMesa, true);

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


    let tocha = this.add.sprite(this.game.scale.width * (72.6 / 100),0, 'tocha')
      .setOrigin(0, 0)
      .setScale(0.7, 0.7);
    objetos.add(tocha, true);

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('tocha', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    tocha.anims.play('turn');
  }
}
