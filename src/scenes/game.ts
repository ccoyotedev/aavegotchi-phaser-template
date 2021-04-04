import '../helpers/ethers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export default class GameScene extends Phaser.Scene {
  public address: string;
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private loginText: Phaser.GameObjects.Text;
 
  constructor() {
    super(sceneConfig);
  }
 
  public create() {
    this.square = this.add.rectangle(300, 300, 100, 100, 0xFFFFFF) as any;
    this.physics.add.existing(this.square);

    this.loginText =
      this.add
        .text(16, 16, `Loading...`)
        .setFontSize(18)
        .setFontFamily('Trebuchet MS')
        .setColor('#00ffff')
  }
 
  public update() {
    if (!this.address && window.ethereum.selectedAddress) {
      this.address = window.ethereum.selectedAddress;
      this.loginText.text = `Logged in as: ${this.address}`;
    }
  
    const cursorKeys = this.input.keyboard.createCursorKeys();
 
    if (cursorKeys.up.isDown) {
      this.square.body.setVelocityY(-500);
    } else if (cursorKeys.down.isDown) {
      this.square.body.setVelocityY(500);
    } else {
      this.square.body.setVelocityY(0);
    }
    
    if (cursorKeys.right.isDown) {
      this.square.body.setVelocityX(500);
    } else if (cursorKeys.left.isDown) {
      this.square.body.setVelocityX(-500);
    } else {
      this.square.body.setVelocityX(0);
    }
  }
}